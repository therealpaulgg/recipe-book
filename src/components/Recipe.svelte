<script lang="ts" context="module">
    import { base } from "$app/paths";
    export async function load({ fetch, params }) {
        const name = params.name
        const recipes = await fetch(`${base}/recipe/${name}.json`).then((r) => r.json());
        return {
            props: { recipes }
        };
    }
</script>

<script lang="ts">
    export let recipe;
    export let hover: boolean = false;
</script>

<div
    class={`bg-zinc-700 shadow-lg gap-2 h-full rounded flex flex-col justify-center items-center ${
        hover ? "hover:bg-zinc-500" : ""
    }`}
>
    {#if recipe.metadata.image}
        <img
            src={`/images/${recipe.metadata.image}`}
            alt={recipe.metadata.title}
            class="object-cover shadow"
        />
    {/if}
    <div class="text-center">
        <h1 class="mt-0">{recipe.metadata.title}</h1>
        <div class="text-lg">{recipe.metadata.excerpt}</div>
    </div>
</div>
