import { process } from "$lib/markdown";
import { json } from "@sveltejs/kit";
import fs from "fs";
import dayjs from "dayjs";
export const prerender = true;

export function GET({ params }) {
    const { slug } = params;
    const recipes = fs
        .readdirSync(`src/content/recipes/${slug}`)
        .filter((fileName) => /.+\.md$/.test(fileName))
        .map((fileName) => {
            const { metadata, content } = process(`src/content/recipes/${slug}/${fileName}`);
            return {
                metadata,
                slug: fileName.slice(0, -3),
                content
            };
        })
        .filter((post) => post.metadata.category && post.metadata.category === slug);
        
    return json(recipes);
}
