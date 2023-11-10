<script lang="ts">
    export let nutritionFacts: { foods: SimplifiedFood[]; errors: any[] };
    export let servings = 1;
    import {
        faClipboardList,
        faFire,
        faDrumstickBite,
        faBreadSlice,
        faFish,
        faToggleOn,
        faToggleOff,
        faWeight,
        faRuler,
        faCubes,
        faBacon,
        faHotdog,
        faPlateWheat
    } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import Card from "./Card.svelte";

    let showTotals = true; // State to toggle between total macros and individual items

    // Function to calculate nutrition based on serving size
    const calculateNutrition = (
        foods: SimplifiedFood[],
        nutrient:
            | "calories"
            | "fat"
            | "carbs"
            | "protein"
            | "fiber"
            | "saturatedFat"
            | "sugars"
            | "sodium"
    ) => {
        return Math.round(
            foods.reduce((acc, food) => {
                const nutrientValue = food[nutrient];
                return acc + nutrientValue;
            }, 0) / servings
        );
    };
</script>

<Card>
    <div slot="title" class="text-2xl font-bold flex items-center gap-4 p-4">
        <Icon data={faClipboardList} scale={1.75} /> Nutrition Facts
    </div>
    <div slot="excerpt" class="p-4">
        {#if showTotals}
            <div class="text-lg flex justify-between bg-zinc-700 p-2 rounded shadow-lg">
                <div>
                    <div class="text-xl font-semibold">Total</div>
                    <div>Serves {servings}</div>
                </div>
                <div class="grid grid-cols-4 gap-2 items-center align-top">
                    <div class="flex items-center gap-2">
                        <Icon data={faFire} class="text-red-500" />
                        {calculateNutrition(nutritionFacts.foods, "calories")} cal
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon data={faDrumstickBite} class="text-amber-600" />
                        {calculateNutrition(nutritionFacts.foods, "fat")}g fat
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon data={faBreadSlice} class="text-orange-300" />
                        {calculateNutrition(nutritionFacts.foods, "carbs")}g carbs
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon data={faFish} class="text-pink-300" />
                        {calculateNutrition(nutritionFacts.foods, "protein")}g protein
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon data={faPlateWheat} class="text-green-500" />
                        {calculateNutrition(nutritionFacts.foods, "fiber")}g fiber
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon data={faBacon} class="text-rose-400" />
                        {calculateNutrition(nutritionFacts.foods, "saturatedFat")}g s. fat
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon data={faCubes} class="text-white" />
                        {calculateNutrition(nutritionFacts.foods, "sugars")}g sugars
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon data={faHotdog} class="text-amber-500" />
                        {calculateNutrition(nutritionFacts.foods, "sodium")}mg sodium
                    </div>
                </div>
            </div>
        {:else}
            <ul class="space-y-2">
                {#each nutritionFacts.foods as food}
                    <li class="text-lg grid grid-cols-2 bg-zinc-700 p-2 rounded shadow-lg">
                        <div class="flex flex-col justify-center">
                            <div class="flex gap-2 items-center">
                                <Icon data={faRuler} />
                                <span>
                                    {food.servingSize}
                                    {food.servingUnit}
                                </span>
                            </div>
                            <div class="flex gap-2 items-center">
                                <Icon data={faWeight} />
                                <span>{food.servingWeightGrams} g</span>
                            </div>
                            <div class="font-bold">{food.name}</div>
                        </div>
                        <div class="grid grid-cols-4 gap-2 items-center">
                            <div class="flex items-center gap-2">
                                <Icon data={faFire} class="text-red-500" />
                                <span class="font-medium">{Math.round(food.calories)} cal</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon data={faDrumstickBite} class="text-amber-600" />
                                <span class="font-medium">{Math.round(food.fat)}g fat</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon data={faBreadSlice} class="text-orange-300" />
                                <span class="font-medium">{Math.round(food.carbs)}g carbs</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon data={faFish} class="text-pink-300" />
                                <span class="font-medium">{Math.round(food.protein)}g protein</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon data={faPlateWheat} class="text-green-500" />
                                <span class="font-medium">{Math.round(food.fiber)}g fiber</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon data={faBacon} class="text-rose-400" />
                                <span class="font-medium">{Math.round(food.saturatedFat)}g s. fat</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon data={faCubes} class="text-white" />
                                <span class="font-medium">{Math.round(food.sugars)}g sugars</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <Icon data={faHotdog} class="text-amber-500" />
                                <span class="font-medium">{Math.round(food.sodium)}mg sodium</span>
                            </div>
                        </div>
                    </li>
                {/each}
            </ul>
        {/if}
        <div class="flex items-center mt-4">
            <button
                class="flex items-center gap-2 p-2 border rounded bg-zinc-700 hover:bg-zinc-500"
                on:click={() => (showTotals = !showTotals)}
            >
                <Icon data={showTotals ? faToggleOff : faToggleOn} scale={1.5} />
                <span>{showTotals ? "Showing totals" : "Showing individual items"}</span>
            </button>
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
