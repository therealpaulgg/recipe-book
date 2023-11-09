import { base } from "$app/paths";
export async function load({ params, fetch }) {
    const slug = params.slug;
    const category = params.category;
    const recipe = await fetch(`${base}/category/${category}/recipe/${slug}.json`).then((r) =>
        r.json()
    );

    const nutritionFacts = await fetch(
        `${base}/category/${category}/recipe/${slug}/nutrition.json`
    ).then((r) => r.json());

    recipe.metadata.nutrition = nutritionFacts.nutrition;
    recipe.metadata.componentContent = recipe.metadata.componentContent.map((component, i) => ({
        ...component,
        nutrition: nutritionFacts.components[i]
    }));

    return { recipe };
}
