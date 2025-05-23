<script lang="ts">
    export let rating: number;
    import chroma from "chroma-js";
    const scale = chroma.scale(["#eb4446", "#f29d0d", "fae48a", "#48dc82"]).domain([1, 10]);
    const color = scale(rating);
</script>

<div class="max-w-[80px] text-center">
    <div>Rating: {rating}</div>
    <div class="w-full border-b-2" style={`border-color: ${color}`}></div>
</div>
