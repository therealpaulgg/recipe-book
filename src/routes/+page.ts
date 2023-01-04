import { base } from "$app/paths";
export async function load({ fetch }) {
    const categories = await fetch(`${base}/categories.json`).then((r) => r.json());
    return { categories };
}
