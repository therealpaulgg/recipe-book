<script lang="ts">
    export let nutritionFacts: { foods: SimplifiedFood[]; errors: any[] };
    import {
        faClipboardList,
        faFire,
        faDrumstickBite,
        faBreadSlice,
        faFish
    } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import Card from "./Card.svelte";
    // TODO make this look better and also take into account serving size when computing math
    // IDEAS: Present total macros first, display total list later. Maybe even have a toggle to switch between the two
</script>

<Card>
    <div slot="title" class="text-white text-2xl font-bold flex items-center gap-4 p-4">
        <Icon data={faClipboardList} scale={1.75} /> Nutrition Facts
    </div>
    <div slot="excerpt" class="p-4">
        <ul class="space-y-2">
            {#each nutritionFacts.foods as food}
                <li class="text-lg flex justify-between">
                    <span>{food.servingSize} {food.servingUnit} ({food.servingWeightGrams}g)</span>
                    <span>{food.name}</span>
                    <span class="font-medium"><Icon data={faFire} /> {food.calories} cal</span>
                </li>
            {/each}
        </ul>
        <div class="text-xl font-bold flex justify-between items-center mt-4 pt-4">
            <span>Total</span>
            <span class="text-white">
                <Icon data={faFire} />
                {nutritionFacts.foods.reduce((a, b) => a + b.calories, 0)} cal |
                <Icon data={faDrumstickBite} />
                {nutritionFacts.foods.reduce((a, b) => a + b.fat, 0)}g fat |
                <Icon data={faBreadSlice} />
                {nutritionFacts.foods.reduce((a, b) => a + b.carbs, 0)}g carbs |
                <Icon data={faFish} />
                {nutritionFacts.foods.reduce((a, b) => a + b.protein, 0)}g protein
            </span>
        </div>
        {#if nutritionFacts.errors.length > 0}
            <div class="text-red-500 mt-4">
                <ul>
                    {#each nutritionFacts.errors as error}
                        <li>
                            Error with "{error.original_text}": {JSON.stringify(
                                Object.fromEntries(
                                    Object.entries(error).filter(([key]) => key !== "original_text")
                                )
                            )}
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</Card>
