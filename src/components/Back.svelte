<script lang="ts">
    import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
</script>

<button
    class="no-underline"
    on:click={() => {
        window.history.back();
    }}><Icon data={faArrowLeft} /> Back</button
>
