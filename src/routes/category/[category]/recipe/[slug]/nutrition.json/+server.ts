import { process } from "$lib/markdown";
import readingTime from "reading-time";
import fs from "fs";
export const prerender = false;

export async function GET({ params }) {
    const { slug, category } = params;

    const { metadata, content } = process(`src/content/recipes/${category}/${slug}.md`);

    const components = fs
        .readdirSync(`src/content/components`)
        .filter((fileName) => /.+\.md$/.test(fileName))
        .map((fileName) => {
            const { metadata, content } = process(`src/content/components/${fileName}`);
            return {
                metadata,
                slug: fileName.slice(0, -3),
                readingTime: readingTime(content).text
            };
        })
        .filter((component) => metadata.components.map(x => typeof x === "string" ? x : x.name)?.includes(component.metadata.title));

    // dedupe list
    let ingredients = metadata.ingredients;
    const nutrientsToInclude = metadata.components.filter(x => typeof x === "string" || !x.excludeFromNutrition).map(x => typeof x === "string" ? x : x.name);
    ingredients.push(...nutrientsToInclude)
    const nutrition = await getMacros(ingredients, metadata);
    const componentNutrition = await Promise.all(components.map((component) => getMacros(component.metadata.ingredients, component.metadata)))

    const data = {nutrition, components: componentNutrition}

    return new Response(JSON.stringify(data));
}

async function getMacros(ingredients: (string | {name: string; excludeFromNutrition: boolean})[], metadata: any) {
    ingredients = ingredients.filter((x) => {
        if (typeof x !== "string") {
            if (x.excludeFromNutrition) {
                return false;
            }
        }
        return true;
    }).map((x) => {
        if (typeof x !== "string") {
            return x.name;
        }
        return x;
    });

    const payload = {
        query: ingredients.join("\n"),
        line_delimited: true,
        use_raw_foods: true,
        num_servings: metadata.servings ?? undefined
    };

    const data = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-app-id": import.meta.env.VITE_APP_ID,
            "x-app-key": import.meta.env.VITE_APP_KEY
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            const foods: Food[] = data.foods
            const errors = data.errors
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
                potassium: f.nf_potassium,
            }))
            return {
                foods: simplifiedFoods,
                errors
            }
        })
        .catch(error => {
            console.error(error);
        });

    return data;
}