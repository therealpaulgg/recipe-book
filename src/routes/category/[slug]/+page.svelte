<script lang="ts">
    import { base } from "$app/paths";
    export let data;
    let { recipes, slug } = data;
    $: ({ recipes, slug } = data);
    import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import Recipe from "../../../components/Recipe.svelte";
    import Back from "../../../components/Back.svelte";
    import RatingScale from "../../../components/RatingScale.svelte";

    let sortBy = 'title';

    $: sortedRecipes = [...recipes].sort((a, b) => {
        switch (sortBy) {
            case 'title':
                return a.metadata.title.localeCompare(b.metadata.title);
            case 'rating':
                return b.metadata.rating - a.metadata.rating;
            default:
                return 0;
        }
    });
</script>

<svelte:head>
    <title>Recipe Book</title>
</svelte:head>

<Back />

<RatingScale />

<div class="mb-4">
    <label for="sort-select" class="block text-md font-medium">Sort by:</label>
    <select id="sort-select" bind:value={sortBy} class="px-3 py-2 border border-zinc-700 rounded-md bg-zinc-700 text-white focus:outline-zinc-500">
        <option value="title">Title (A-Z)</option>
        <option value="rating">Rating (High to Low)</option>
    </select>
</div>

{#if recipes.length > 0}
    <div class="grid lg:grid-cols-2 gap-4 mt-4">
        {#each sortedRecipes as recipe}
            <a
                href={`${base}/category/${slug}/recipe/${recipe.slug}`}
                class="hover:text-white no-underline"
            >
                <Recipe category={slug} {recipe} hover />
            </a>
        {/each}
    </div>
{:else}
    <h1>Oh. No recipes were found for {slug}. :(</h1>
{/if}
