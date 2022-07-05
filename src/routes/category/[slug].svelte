<script lang="ts" context="module">
    import { base } from "$app/paths";
    export async function load({ fetch, params }) {
        const slug = params.slug;
        const recipes = await fetch(`${base}/category/${slug}.json`).then((r) => r.json());
        return {
            props: { recipes, slug }
        };
    }
</script>

<script lang="ts">
    export let recipes;
    export let slug;
    export let name;
    import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import Recipe from "../../components/Recipe.svelte";
    import Back from "../../components/Back.svelte";
    import RatingScale from "../../components/RatingScale.svelte";
</script>

<svelte:head>
    <title>Recipe Book</title>
</svelte:head>

<Back />

<RatingScale />

{#if recipes.length > 0}
    <div class="grid lg:grid-cols-2 gap-4 mt-4">
        {#each recipes as recipe}
            <a href={`${base}/category/${slug}/recipe/${recipe.slug}`} class="hover:text-white no-underline">
                <Recipe category={slug} {recipe} hover />
            </a>
        {/each}
    </div>
{:else}
    <h1>Oh. No recipes were found for {slug}. :(</h1>
{/if}
