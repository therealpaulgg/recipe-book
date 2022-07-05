<script lang="ts">
    export let category: string;
    export let name: string;
</script>

<a href={`/category/${category}/tag/${name}`} class="px-1 rounded bg-zinc-500 hover:bg-gray-700 no-underline">{name}</a>
