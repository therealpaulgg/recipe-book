import adapter from "@sveltejs/adapter-static"
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: null,
            precompress: false,
            strict: true,
        })
    }
};

export default config;
