<script lang="ts">
    export let nested = false;
</script>

<div class={`${nested ? "bg-zinc-500" : "bg-zinc-600"} rounded shadow my-4`}>
    <div class="bg-zinc-700 p-2 rounded-t">
        <slot name="title" />
    </div>
    <div class="p-2">
        <slot name="excerpt" />
    </div>
</div>
