import { process } from "$lib/markdown";
import fs from "fs";
import { json } from "@sveltejs/kit";
import type {
    Component,
    ComponentMetadata,
    Ingredient,
    RecipeMetadata
} from "src/models/RecipeMetadata";

export async function GET({ params }) {
    const { slug, category } = params;

    const { metadata, content }: { metadata: RecipeMetadata; content: string } = process(
        `src/content/recipes/${category}/${slug}.md`
    );

    // TODO: this code is a complete disaster.
    const components = fs
        .readdirSync(`src/content/components`)
        .filter((fileName) => /.+\.md$/.test(fileName))
        .map((fileName) => {
            const { metadata, content }: { metadata: ComponentMetadata; content: string } = process(
                `src/content/components/${fileName}`
            );
            return {
                metadata,
                slug: fileName.slice(0, -3),
                content
            };
        })
        .filter((component) =>
            metadata.components
                ?.map((component) => (typeof component === "string" ? component : component.name))
                ?.includes(component.metadata.title)
        );

    // TODO: this code is a complete disaster.
    let ingredients = metadata.ingredients;
    const includeComponent = (component: string | Component) =>
        typeof component === "string" || !component?.excludeFromNutrition;
    metadata.components
        ?.filter((x) => includeComponent(x))
        ?.map((x) => (typeof x === "string" ? x : x.name))
        ?.map((x) => components.find((y) => y.metadata.title === x))
        ?.filter((x) => x)
        ?.forEach((x) => ingredients.push(...x.metadata.ingredients));
    const nutrition = await getMacros(ingredients, metadata).catch((e) => null);
    const componentNutrition = await Promise.all(
        components.map((component) =>
            !includeComponent(
                metadata.components?.find((x) =>
                    typeof x === "string"
                        ? x === component.metadata.title
                        : x.name === component.metadata.title
                )
            )
                ? getMacros(component.metadata.ingredients, component.metadata).catch((e) => null)
                : null
        )
    );

    return json({ nutrition, components: componentNutrition });
}

async function getMacros(
    ingredients: (string | Ingredient)[],
    metadata: RecipeMetadata | ComponentMetadata
) {
    const individualLookup = ingredients.filter(
        (x) => typeof x === "object" && x.nutritionId != null
    ) as Ingredient[];
    ingredients = ingredients
        .filter((x) => {
            if (typeof x !== "string") {
                if (x.excludeFromNutrition || x.nutritionId != null) {
                    return false;
                }
            }
            return true;
        })
        .map((x) => {
            if (typeof x !== "string") {
                return x.name;
            }
            return x;
        });

    const payload = {
        query: ingredients.join("\n"),
        line_delimited: true,
        use_raw_foods: true,
        use_branded_foods: metadata.brandedFoods ?? undefined
        // always fetch '1' serving size. We will calculate serving sizes by doing basic math.
        // num_servings: metadata.servings ?? undefined
    };

    const data = await fetch("https://recipeproxy.paulgellai.dev/api/v1/proxy/nutrition", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        },
        body: JSON.stringify(payload)
    })
        .then((response) => response.json())
        .then((data) => {
            if (data?.foods == null) {
                throw new Error(
                    `Missing data from API.\n Details: ${JSON.stringify(data)}\n recipe: ${
                        metadata?.title
                    }\n payload: ${JSON.stringify(payload)}`
                );
            }
            const foods: Food[] = data.foods;
            const errors = data.errors;

            const simplifiedFoods: SimplifiedFood[] = foods.map((f) => ({
                name: f.food_name,
                brand: f.brand_name,
                servingSize: f.serving_qty,
                servingUnit: f.serving_unit,
                servingWeightGrams: f.serving_weight_grams,
                calories: f.nf_calories,
                fat: f.nf_total_fat,
                saturatedFat: f.nf_saturated_fat,
                cholesterol: f.nf_cholesterol,
                sodium: f.nf_sodium,
                carbs: f.nf_total_carbohydrate,
                fiber: f.nf_dietary_fiber,
                sugars: f.nf_sugars,
                protein: f.nf_protein,
                potassium: f.nf_potassium
            }));
            return {
                foods: simplifiedFoods,
                errors
            };
        })
        .catch((error) => {
            console.error(error);
        });

    const fetchedFoods = await Promise.all(individualLookup.map((x) =>
        fetch(`https://recipeproxy.paulgellai.dev/api/v1/proxy/item?nix_item_id=${x.nutritionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        })
            .then((r) => r.json())
            .catch((err) => {
                console.error(err);
            })
    ));

    if (data) {
        fetchedFoods.forEach((f, i) => {
            if (f?.foods == null) {
                throw new Error(
                    `Missing data from API.\n Details: ${JSON.stringify(f)}\n recipe: ${
                        metadata?.title
                    }\n payload: ${JSON.stringify(payload)}`
                );
            }
            const food: Food = f.foods[0];
            const errors = f.errors;
            const servings = individualLookup[i].servings ?? 1
            data.foods.push({
                name: food.food_name,
                brand: food.brand_name,
                servingSize: food.serving_qty * servings,
                servingUnit: food.serving_unit,
                servingWeightGrams: food.serving_weight_grams * servings,
                calories: food.nf_calories * servings,
                fat: food.nf_total_fat * servings,
                saturatedFat: food.nf_saturated_fat * servings,
                cholesterol: food.nf_cholesterol * servings,
                sodium: food.nf_sodium * servings,
                carbs: food.nf_total_carbohydrate * servings,
                fiber: food.nf_dietary_fiber * servings,
                sugars: food.nf_sugars * servings,
                protein: food.nf_protein * servings,
                potassium: food.nf_potassium * servings
            })
            if (errors) data.errors.push(...errors)
        })
    }

    return data;
}
