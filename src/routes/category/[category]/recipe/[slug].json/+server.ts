import { process } from "$lib/markdown";
import readingTime from "reading-time";
import fs from "fs";
import { json } from "@sveltejs/kit";
export const prerender = true;

export function GET({ params }) {
    const { slug, category } = params;

    const { metadata, content } = process(`src/content/recipes/${category}/${slug}.md`);

    const components = fs
        .readdirSync(`src/content/components`)
        .filter((fileName) => /.+\.md$/.test(fileName))
        .map((fileName) => {
            const { metadata, content } = process(`src/content/components/${fileName}`);
            return {
                metadata,
                slug: fileName.slice(0, -3),
                readingTime: readingTime(content).text
            };
        })
        .filter((component) =>
            metadata.components
                ?.map((x) => (typeof x === "string" ? x : x.name))
                ?.includes(component.metadata.title)
        );
    metadata.componentContent = components;

    return json({ metadata, content, readingTime: readingTime(content).text })
}
