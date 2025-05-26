<script lang="ts">
    export let ingredient: Ingredient;
    import uniqueid from "lodash.uniqueid";
    import type { Ingredient } from "src/models/RecipeMetadata";
    const id = uniqueid();
</script>

<div class="text-lg mb-2 flex items-center gap-2">
    <input class="form-checkbox rounded w-4 h-4" type="checkbox" {id} />
    {#if typeof ingredient === "string"}
        <label for={id} class="cursor-pointer">{ingredient}</label>
    {:else if typeof ingredient === "object" && ingredient.link}
        <a href={ingredient.link} target="_blank" class="cursor-pointer">{ingredient.name}</a>
    {:else}
        <label for={id} class="cursor-pointer">{ingredient.name}</label>
    {/if}
</div>
