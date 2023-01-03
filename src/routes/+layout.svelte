<script lang="ts">
    import { page } from "$app/stores";
    import dayjs from "dayjs";
    import Navbar from "../components/Navbar.svelte";
    import Typewriter from "../components/Typewriter.svelte";

    import "../app.css";
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/base16/solar-flare.min.css"
    />
</svelte:head>

<div class="relative min-h-screen bg-zinc-800 text-white font-body pb-16">
    <Navbar>
        <div slot="name">
            <div>
                <div class="pr-4">Recipe Book</div>
                <div class="text-base">
                    <Typewriter words={["Hello", "There!"]} />
                </div>
            </div>
        </div>
        <div slot="links" class="flex gap-4">
            <a href="/" class="navbar-link" class:active={$page.url.pathname === "/"}>Home</a>
        </div>
    </Navbar>

    <div class="mx-auto container pb-16 px-2"><slot /></div>
    <footer class="bottom-0 left-0 right-0 p-3 absolute w-full bg-zinc-700">
        <div class="mx-auto container text-center">
            Copyright © {dayjs().year()} <a href="https://paulgellai.dev">Paul Gellai.</a> All rights
            reserved.
        </div>
    </footer>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap");
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap');
</style>
