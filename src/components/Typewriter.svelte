<script lang="ts">
    import { onMount } from "svelte";

    export let speed = 100;
    export let nextWordInterval = 500;
    export let words = [];

    let displayText = [];
    let currentWord = [];
    let wordIdx = 0;
    let timeoutSpeed = null;
    let isWaitingNextWord = false;
    let doneTyping = false;

    function start() {
        if (words && words.length > 0) {
            currentWord = words[wordIdx].split("");
            timeoutSpeed = speed;
            setTimeout(type, timeoutSpeed);
        }
    }
    function type() {
        // if typing...
        if (currentWord.length > 0) {
            displayText = [...displayText, currentWord.shift()];
            // if done typing, wait for a while
        } else if (
            !isWaitingNextWord &&
            currentWord.length === 0 &&
            displayText.length ===
                words
                    .slice(0, wordIdx + 1)
                    .map((a) => a.length)
                    .reduce((a, b) => a + b) +
                    words.slice(0, wordIdx).length
        ) {
            timeoutSpeed = nextWordInterval;
            isWaitingNextWord = true;
            // if done typing all words, stop
        } else if (
            currentWord.length === 0 &&
            displayText.length > 0 &&
            wordIdx === words.length - 1
        ) {
            doneTyping = true;
            return;
            // if done typing current word, wait and type next word
        } else if (currentWord.length === 0 && displayText.length > 0) {
            if (wordIdx < words.length - 1) {
                wordIdx++;
            }
            timeoutSpeed = speed;
            isWaitingNextWord = false;
            currentWord = words[wordIdx].split("");
            displayText.push(" ");
            displayText.push(currentWord.shift());
        }
        setTimeout(type, timeoutSpeed);
    }

    onMount(() => {
        start();
    });
</script>

<span class="whitespace-pre">
    {displayText.join("")}
    <span class="relative">
        {#if !doneTyping && displayText.length > 0}
            <span class="absolute cursor">▌</span>
        {/if}
    </span>
</span>

<style lang="scss">
    @keyframes blink-animation {
        to {
            visibility: hidden;
        }
    }
    .cursor {
        display: inline-block;
        margin-left: -3px;
        animation: blink-animation 1s steps(2, start) infinite;
    }
</style>
