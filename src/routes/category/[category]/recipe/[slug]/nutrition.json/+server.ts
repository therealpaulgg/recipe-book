import { process } from "$lib/markdown";
import readingTime from "reading-time";
import fs from "fs";
export const prerender = false;

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
        .filter((component) => metadata.components?.includes(component.metadata.title));
    metadata.componentContent = components;

    // TODO get ingredients here
    console.log(components.map(x => x));

    const body = JSON.stringify({ ingredients: metadata.ingredients });

    return new Response(body);
}
