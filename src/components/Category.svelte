<script lang="ts" context="module">
    import { base } from "$app/paths";
    export async function load({ fetch }) {
        const categories = await fetch(`${base}/index.json`).then((r) => r.json());
        return {
            props: { categories }
        };
    }
</script>

<script lang="ts">
    export let category;
    export let hover: boolean = false;
</script>

<div
    class={`bg-zinc-700 shadow-lg gap-2 h-full rounded flex flex-col justify-center items-center ${
        hover ? "hover:bg-zinc-500" : ""
    }`}
>
    {#if category.metadata.image}
        <img
            src={`/images/${category.metadata.image}`}
            alt={category.metadata.title}
            class="object-cover shadow"
        />
    {/if}
    <div class="text-center">
        <h1 class="mt-0">{category.metadata.title}</h1>
        <div class="text-lg">{category.metadata.excerpt}</div>
    </div>
</div>
