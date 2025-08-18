<script lang="ts">
    import { base } from "$app/paths";
    export let recipe;
    export let category;
    export let hover: boolean = false;
    import Tag from "../components/Tag.svelte";
    import Rating from "../components/Rating.svelte";
</script>

<div class={`bg-zinc-700 shadow-lg h-full rounded flex flex-col justify-between ${hover ? "hover:bg-zinc-500" : ""}`}>
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
                    <Rating rating={recipe.metadata.rating} />
                {/if}
            </div>
        </div>
    </div>

    <div class="bg-zinc-600 min-h-[32px] rounded-b">
        {#if recipe.metadata.tags}
            <div class="flex gap-2 p-1 flex-wrap">
                {#each recipe.metadata.tags as tag}
                    <Tag {category} name={tag} />
                {/each}
            </div>
        {/if}
    </div>
</div>
