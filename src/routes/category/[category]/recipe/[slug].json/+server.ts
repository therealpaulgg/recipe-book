import { process } from "$lib/markdown";
import fs from "fs";
import { json } from "@sveltejs/kit";
import type { ComponentMetadata, RecipeMetadata } from "src/models/RecipeMetadata.js";
export const prerender = true;

export function GET({ params }) {
    const { slug, category } = params;

    const { metadata, content }: { metadata: RecipeMetadata; content: string } = process(
        `src/content/recipes/${category}/${slug}.md`
    );

    const components = fs
        .readdirSync(`src/content/components`)
        .filter((fileName) => /.+\.md$/.test(fileName))
        .map((fileName) => {
            const { metadata, content }: {metadata: ComponentMetadata; content: string} = process(`src/content/components/${fileName}`);
            return {
                metadata,
                content,
                slug: fileName.slice(0, -3)
            };
        })
        .filter((component) =>
            metadata.components
                ?.map((x) => (typeof x === "string" ? x : x.name))
                ?.includes(component.metadata.title)
        );
    metadata.componentContent = components;

    return json({ metadata, content });
}
