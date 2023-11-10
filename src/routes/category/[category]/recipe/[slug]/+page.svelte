<script lang="ts">
    export let data;
    let { recipe } = data;
    $: ({ recipe } = data);
    import { faBoxes, faClipboardList, faHammer } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import Card from "../../../../../components/Card.svelte";
    import Step from "../../../../../components/Step.svelte";
    import Back from "../../../../../components/Back.svelte";
    import RatingScale from "../../../../../components/RatingScale.svelte";
    import Rating from "../../../../../components/Rating.svelte";
    import NutritionFacts from "../../../../../components/NutritionFacts.svelte";
</script>

<svelte:head>
    <title>{recipe.metadata.title}</title>
</svelte:head>

<Back />

<RatingScale />

<div class="bg-zinc-700 p-2 rounded my-2 flex flex-col">
    <div>
        <h2 class="m-0">{recipe.metadata.title}</h2>
        <p class="my-1 italic">{recipe.metadata.excerpt}</p>
    </div>
    {#if recipe.metadata.servings != null}
        <div class="text-lg flex items-center gap-1 mb-1">
            <span class="font-bold">Servings: </span>{recipe.metadata.servings}
        </div>
    {/if}
    {#if recipe.metadata.rating}
        <Rating rating={recipe.metadata.rating} />
    {/if}
</div>

{#if recipe.metadata.ingredients}
    <Card>
        <div slot="title" class="text-2xl font-bold flex items-center gap-4">
            <Icon data={faBoxes} scale={1.75} /> Ingredients
        </div>
        <div slot="excerpt">
            <ul class="mt-2">
                {#each recipe.metadata.ingredients as ingredient}
                    <Step ingredient={ingredient} />
                {/each}
            </ul>
        </div>
    </Card>
{/if}

{#if recipe.metadata.components}
    <Card>
        <div slot="title" class="text-2xl font-bold flex items-center gap-4">
            <Icon data={faHammer} scale={1.75} /> Components
        </div>
        <div slot="excerpt" class="grid lg:grid-cols-2">
            {#each recipe.metadata.componentContent as component}
                <Card nested>
                    <div slot="title">
                        <h2 class="m-0">{component.metadata.title}</h2>
                        <p class="mt-1 mb-2 italic">{component.metadata.excerpt}</p>
                    </div>
                    <div slot="excerpt">
                        <div class="text-xl font-bold flex items-center gap-2">
                            <Icon data={faBoxes} scale={1.5} /> Ingredients
                        </div>
                        <ul class="mt-2">
                            {#each component.metadata.ingredients as ingredient}
                                <Step ingredient={ingredient} />
                            {/each}
                        </ul>
                        <div class="text-xl font-bold flex items-center gap-3">
                            <Icon data={faClipboardList} scale={1.5} />
                            Directions
                        </div>
                        <ul class="mt-2">
                            {#each component.metadata.directions as direction}
                                <Step ingredient={direction} />
                            {/each}
                        </ul>
                        {#if component.nutrition}<NutritionFacts
                                nutritionFacts={component.nutrition}
                            />
                        {/if}
                    </div>
                </Card>
            {/each}
        </div>
    </Card>
{/if}

{#if recipe.metadata.directions}
    <Card>
        <div slot="title" class="text-2xl font-bold flex items-center gap-4">
            <Icon data={faClipboardList} scale={1.75} /> Directions
        </div>
        <div slot="excerpt">
            <ul>
                {#each recipe.metadata.directions as direction}
                    <Step ingredient={direction} />
                {/each}
            </ul>
        </div>
    </Card>
{/if}

{#if recipe.metadata.nutrition}
    <NutritionFacts nutritionFacts={recipe.metadata.nutrition} servings={recipe.metadata.servings} />
{/if}

<div class="my-2">
    {@html recipe.content}
</div>
