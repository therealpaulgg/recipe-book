import { base } from "$app/paths";
export async function load({ fetch, params }) {
    const slug = params.slug;
    const recipes = await fetch(`${base}/category/${slug}.json`).then((r) => r.json());
    return { recipes, slug };
}
