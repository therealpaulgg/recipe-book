import { process } from "$lib/markdown";
import { json } from "@sveltejs/kit";
import fs from "fs";
import dayjs from "dayjs";
export const prerender = true;

export function GET({ params }) {
    const { slug } = params;

    try {
        const recipes = fs
            .readdirSync(`src/content/recipes/${slug}`)
            .filter((fileName) => /.+\.md$/.test(fileName))
            .map((fileName) => {
                try {
                    const { metadata, content } = process(
                        `src/content/recipes/${slug}/${fileName}`
                    );
                    return {
                        metadata,
                        slug: fileName.slice(0, -3),
                        content
                    };
                } catch (error) {
                    console.error(`Error processing recipe file ${fileName}:`, error);
                    return null;
                }
            })
            .filter(
                (recipe) => recipe && recipe.metadata.category && recipe.metadata.category === slug
            );

        return json(recipes);
    } catch (error) {
        console.error(`Error reading recipes for category ${slug}:`, error);
        return json([]);
    }
}
