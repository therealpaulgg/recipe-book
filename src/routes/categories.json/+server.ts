import { process } from "$lib/markdown";
import readingTime from "reading-time"
export const prerender = true;

import fs from "fs";

export function GET() {
    const categories = fs
        .readdirSync(`src/content/categories`)
        .filter((fileName) => /.+\.md$/.test(fileName))
        .map((fileName) => {
            const { metadata, content } = process(`src/content/categories/${fileName}`);
            return {
                metadata,
                slug: fileName.slice(0, -3),
                readingTime: readingTime(content).text
            };
        });
    const body = JSON.stringify(categories);

    return new Response(body);
}
