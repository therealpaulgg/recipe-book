<script lang="ts">
    export let name;
    import uniqueid from "lodash.uniqueid";
    const id = uniqueid();
</script>

<div class="text-lg mb-2">
    <input class="form-checkbox rounded w-6 h-6" type="checkbox" {id} />
    <label for={id}>{name}</label>
</div>
