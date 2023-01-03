import { base } from "$app/paths";
export async function load({ fetch, params }) {
    const name = params.name;
    const category = params.category;
    const recipes = await fetch(`${base}/category/${category}/tag/${name}.json`).then((r) =>
        r.json()
    );
    return { recipes, name, category };
}
