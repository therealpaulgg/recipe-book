
<script lang="ts">
    import { base } from "$app/paths";
    export let data;
    let { recipes, category, name } = data;
    $: ({ recipes, category, name } = data);
    import Icon from "svelte-awesome/components/Icon.svelte";
    import Tag from "../../../../../components/Tag.svelte";
    import Recipe from "../../../../../components/Recipe.svelte";
    import Back from "../../../../../components/Back.svelte";
    import RatingScale from "../../../../../components/RatingScale.svelte";
</script>

<svelte:head>
    <title>Recipe Book - {name} tag</title>
</svelte:head>

<Back />
<RatingScale />

<h1 class="mt-2">Recipes for {name}:</h1>

{#if recipes.length > 0}
    <div class="grid lg:grid-cols-2 gap-4 mt-4">
        {#each recipes as recipe}
            <a
                href={`${base}/category/${category}/recipe/${recipe.slug}`}
                class="hover:text-white no-underline"
            >
                <Recipe {category} {recipe} hover />
            </a>
        {/each}
    </div>
{:else}
    <h1>Oh. No recipes were found for {name}. :(</h1>
{/if}
