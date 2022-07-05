<script lang="ts">
    import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    let collapsed = true;
</script>

<nav class="bg-blue-600 p-3">
    <div class="mx-auto container sm:px-4">
        <div class="relative flex items-center justify-between h-16">
            <div
                class="
                    absolute
                    inset-y-0
                    left-0
                    flex
                    items-center
                    sm:hidden
                "
            >
                <!-- Mobile menu button-->
                <button
                    on:click={() => (collapsed = !collapsed)}
                    class="
                        inline-flex
                        items-center
                        justify-center
                        p-2
                        rounded-md
                        text-zinc-700
                        hover:text-white hover:bg-gray-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-white
                    "
                    aria-expanded="false"
                >
                    {#if collapsed}
                        <Icon data={faBars} />
                    {:else}
                        <Icon data={faTimes} />
                    {/if}
                </button>
            </div>
            <div
                class="
                    flex-1 flex
                    items-stretch
                    sm:items-center
                    justify-center
                    sm:justify-start
                "
            >
                <div class="flex-shrink-0 flex items-center">
                    <span
                        class="
                            text-white
                            font-semibold
                            text-xl
                            tracking-tight
                        "><slot name="name" /></span
                    >
                </div>
                <div class="hidden sm:block sm:ml-2">
                    <div class="flex">
                        <slot name="links" />
                        <slot />
                    </div>
                </div>
            </div>
            <div
                class="
                    absolute
                    inset-y-0
                    right-0
                    flex
                    items-center
                    pr-2
                    sm:static sm:inset-auto sm:ml-6 sm:pr-0
                "
            >
                <slot name="right" />
            </div>
        </div>
    </div>

    <!--
Mobile menu, toggle classes based on menu state.

Menu open: "block", Menu closed: "hidden"
-->
    <div class:hidden={collapsed} class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1"><slot name="links" /></div>
    </div>
</nav>
