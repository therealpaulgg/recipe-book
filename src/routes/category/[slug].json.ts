// TODO the process function is broken, but why?????
import { process } from "$lib/markdown";
import readingTime from "reading-time";

import fs from "fs";
import dayjs from "dayjs";

export function GET({ params }): { body: string } {
    const { slug } = params;
    const recipes = fs
        .readdirSync(`src/content/recipes/${slug}`)
        .filter((fileName) => /.+\.md$/.test(fileName))
        .map((fileName) => {
            const { metadata, content } = process(`src/content/recipes/${slug}/${fileName}`);
            return {
                metadata,
                slug: fileName.slice(0, -3),
                readingTime: readingTime(content).text
            };
        })
        .filter((post) => post.metadata.category && post.metadata.category === slug);
    const body = JSON.stringify(recipes);

    return {
        // body: JSON.stringify({a: "MY FUCKING DOT!"})
        body
    };
}
