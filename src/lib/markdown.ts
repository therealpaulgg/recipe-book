import { readSync } from "to-vfile";
import { unified } from "unified";
import parse from "remark-parse";
import gfm from "remark-gfm";
import remark2rehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import frontmatter from "remark-frontmatter";
import highlight from "rehype-highlight";
import django from "highlight.js/lib/languages/django";
import yaml from "yaml";
import dayjs from "dayjs";

const parser = unified().use(parse).use(gfm).use(frontmatter, ["yaml"]);

const runner = unified()
    .use(remark2rehype)
    .use(highlight, { languages: { django } })
    .use(rehypeStringify);

export function process(filename: string): { metadata: any; content: string } {
    const tree = parser.parse(readSync(filename));
    let metadata = null;
    if (tree.children.length > 0 && tree.children[0].type == "yaml") {
        metadata = yaml.parse(tree.children[0].value);
        tree.children = tree.children.slice(1, tree.children.length);
    }
    let content = runner.stringify(runner.runSync(tree));
    if (!metadata) {
        metadata = {
            title: "Error!",
            date: "?",
            excerpt: "Missing Frontmatter!"
        };
        content = "Missing Frontmatter!";
    }
    return { metadata, content };
}
