import { process } from "$lib/markdown";
import { json } from "@sveltejs/kit";

import fs from "fs";
import dayjs from "dayjs";
export const prerender = true;

export function GET({ params }) {
    const { name, category } = params;
    const recipes = fs
        .readdirSync(`src/content/recipes/${category}`)
        .filter((fileName) => /.+\.md$/.test(fileName))
        .map((fileName) => {
            const { metadata, content } = process(`src/content/recipes/${category}/${fileName}`);
            return {
                metadata,
                slug: fileName.slice(0, -3),
                content
            };
        })
        .filter(
            (category) =>
                category.metadata.tags &&
                Array.isArray(category.metadata.tags) &&
                category.metadata.tags.find((t: string) => t === name)
        );
    return json(recipes);
}
