<script lang="ts">
    import chroma from "chroma-js";

    const scale = chroma.scale(["#eb4446", "#f29d0d", "fae48a", "#48dc82"]).domain([1, 10]);
    const colors = scale.colors(10);
</script>

<div class="text-2xl mb-1">Rating Scale (1 - 10):</div>
<div class="flex">
    {#each colors as color}
        <div class="w-4 h-4" style={`background-color: ${color}`}></div>
    {/each}
</div>
