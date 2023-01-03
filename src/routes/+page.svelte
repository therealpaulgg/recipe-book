<script lang="ts">
    import { base } from "$app/paths";
    export let data;
    let { categories } = data;
    $: ({ categories } = data);
    import Category from "../components/Category.svelte";
</script>

<svelte:head>
    <title>Recipe Book</title>
</svelte:head>

<div class="grid lg:grid-cols-2 gap-4 mt-4">
    {#each categories as category}
        <a href={`${base}/category/${category.slug}`} class="hover:text-white no-underline">
            <Category {category} hover />
        </a>
    {/each}
</div>
