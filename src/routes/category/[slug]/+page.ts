import { base } from "$app/paths";
import type { Recipe } from "src/models/RecipeMetadata"
export async function load({ fetch, params }) {
    const slug = params.slug;
    const recipes: Recipe[] = await fetch(`${base}/category/${slug}.json`).then((r) => r.json());
    recipes.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title))
    return { recipes, slug };
}
