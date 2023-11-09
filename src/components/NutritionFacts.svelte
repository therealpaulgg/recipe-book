<script lang="ts">
    export let nutritionFacts: { foods: SimplifiedFood[]; errors: any[] };
    import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import Card from "./Card.svelte";
</script>

<Card>
    <div slot="title" class="text-2xl font-bold flex items-center gap-4">
        <Icon data={faClipboardList} scale={1.75} /> Nutrition Facts
    </div>
    <div slot="excerpt">
        <ul>
            {#each nutritionFacts.foods as food}
                <div class="text-lg flex items-center gap-3">
                    {food.servingSize}
                    {food.servingUnit}
                    ({food.servingWeightGrams}) g
                    {food.name}
                    {food.calories} calories
                </div>
            {/each}
            <div class="text-xl font-bold flex items-center gap-3">
                Total
                {nutritionFacts.foods.reduce((a, b) => a + b.calories, 0)} calories
                {nutritionFacts.foods.reduce((a, b) => a + b.fat, 0)} g fat
                {nutritionFacts.foods.reduce((a, b) => a + b.carbs, 0)} g carbs
                {nutritionFacts.foods.reduce((a, b) => a + b.protein, 0)} g protein
            </div>
        </ul>
        {#if nutritionFacts.errors.length > 0}
            <div class="text-red-500">
                <ul>
                    {#each nutritionFacts.errors as error}
                        <div>Error with "{error.original_text}": {JSON.stringify(Object.fromEntries(Object.entries(error).filter(([key]) => key !== 'original_text')))}</div>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</Card>