<script lang="ts" context="module">
    import { base } from "$app/paths";
    export async function load({ fetch, params }) {
        const name = params.name;
        const category = params.category;
        const recipes = await fetch(`${base}/category/${category}/tag/${name}.json`).then((r) =>
            r.json()
        );
        return {
            props: { recipes, name, category }
        };
    }
</script>

<script lang="ts">
    export let recipes;
    export let category;
    export let name;
    import Icon from "svelte-awesome/components/Icon.svelte";
    import Tag from "../../../../components/Tag.svelte";
    import Recipe from "../../../../components/Recipe.svelte";
    import Back from "../../../../components/Back.svelte";
    import RatingScale from "../../../../components/RatingScale.svelte";
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
