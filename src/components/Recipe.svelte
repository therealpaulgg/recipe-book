<script lang="ts" context="module">
    import { base } from "$app/paths";
    export async function load({ fetch, params }) {
        const name = params.name;
        const recipes = await fetch(`${base}/recipe/${name}.json`).then((r) => r.json());
        return {
            props: { recipes }
        };
    }
</script>

<script lang="ts">
    export let recipe;
    export let category;
    export let hover: boolean = false;
    import Tag from "../components/Tag.svelte";
    import chroma from "chroma-js";

    const scale = chroma.scale(["#eb4446", "#f29d0d", "fae48a", "#48dc82"]).domain([1, 10]);
    const color = scale(recipe.metadata.rating);
</script>

<div class={`bg-zinc-700 shadow-lg h-full rounded  ${hover ? "hover:bg-zinc-500" : ""}`}>
    <div class={`gap-2 flex flex-col`}>
        {#if recipe.metadata.image}
            <img
                src={`/images/${recipe.metadata.image}`}
                alt={recipe.metadata.title}
                class="object-cover shadow"
            />
        {/if}
        <div class="flex items-center justify-between px-2">
            <div>
                <h1 class="mt-0">{recipe.metadata.title}</h1>
                <div class="text-lg">{recipe.metadata.excerpt}</div>
            </div>
            <div>
                {#if recipe.metadata.rating}
                    <div>Rating: {recipe.metadata.rating}</div>
                    <div class="w-full border-2" style={`border-color: ${color}`} />
                {/if}
            </div>
        </div>
    </div>

    <div class="bg-zinc-600 min-h-[32px] rounded-b">
        {#if recipe.metadata.tags}
            <div class="flex gap-4 p-1">
                {#each recipe.metadata.tags as name}
                    <Tag {category} {name} />
                {/each}
            </div>
        {/if}
    </div>
</div>
