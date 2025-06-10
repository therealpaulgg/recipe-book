import { base } from "$app/paths";
export async function load({ fetch, params }) {
    const slug = params.slug;

    try {
        const recipes = await fetch(`${base}/category/${slug}.json`).then((r) => r.json());
        return { recipes, slug };
    } catch (error) {
        console.error(`Error loading recipes for category ${slug}:`, error);
        return { recipes: [], slug };
    }
}
