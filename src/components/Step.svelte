<script lang="ts">
    export let name;
    import uniqueid from "lodash.uniqueid";
    const id = uniqueid();
</script>

<div class="text-lg mb-2 flex items-center gap-2">
    <input class="form-checkbox rounded w-4 h-4" type="checkbox" {id} />
    {#if typeof name === "string"}
        <label for={id} class="cursor-pointer">{name}</label>
    {/if}
    {#if typeof name === "object"}
        <a href={name.link} target="_blank"><label class="cursor-pointer">{name.name}</label></a>
    {/if}
</div>
