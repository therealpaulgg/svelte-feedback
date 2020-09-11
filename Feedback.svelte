<script lang="ts">
    import Transition from "svelte-class-transition"
    
    import Icon from "svelte-awesome"
    import {
        faTimes,
        faCheckCircle,
        faTimesCircle,
        faExclamationTriangle,
        faInfoCircle,
        faQuestionCircle
    } from "@fortawesome/free-solid-svg-icons"

    export let feedbacks = []

    function getRelevantIcon(variant: string) {
        switch (variant) {
            case "error":
                return faTimesCircle
            case "success":
                return faCheckCircle
            case "warning":
                return faExclamationTriangle
            case "info":
                return faInfoCircle
            default:
                return faQuestionCircle
        }
    }

    // Variants: Success, Error, Warning, Information
</script>

<style lang="scss">
    .progress-bar {
        height: 4px;
    }

    .feedback {
        background-color: #cccccc;
        color: black;
    }

    .progress-bar {
        background-color: #cccccc;
    }

    .progress-bar::-webkit-progress-bar {
        background-color: #cccccc;
    }
    .progress-bar::-webkit-progress-value {
        background-color: black;
    }

    .progress-bar::-moz-progress-bar {
        background-color: black;
    }

    .success {
        .feedback {
            background-color: #6dffc8;
            color: #18562e;
        }

        .progress-bar {
            background-color: #6dffc8;
        }

        .progress-bar::-webkit-progress-bar {
            background-color: #6dffc8;
        }
        .progress-bar::-webkit-progress-value {
            background-color: #18562e;
        }

        .progress-bar::-moz-progress-bar {
            background-color: #18562e;
        }
    }

    .error {
        .feedback {
            background-color: #ff8888;
            color: #8e1f1f;
        }

        .progress-bar {
            background-color: #ff8888;
        }

        .progress-bar::-webkit-progress-bar {
            background-color: #ff8888;
        }
        .progress-bar::-webkit-progress-value {
            background-color: #8e1f1f;
        }

        .progress-bar::-moz-progress-bar {
            background-color: #8e1f1f;
        }
    }

    .warning {
        .feedback {
            background-color: #ffed97;
            color: #7b7311;
        }

        .progress-bar {
            background-color: #ffed97;
        }

        .progress-bar::-webkit-progress-bar {
            background-color: #ffed97;
        }
        .progress-bar::-webkit-progress-value {
            background-color: #7b7311;
        }

        .progress-bar::-moz-progress-bar {
            background-color: #7b7311;
        }
    }

    .info {
        .feedback {
            background-color: #97ddff;
            color: #334f5d;
        }

        .progress-bar {
            background-color: #97ddff;
        }

        .progress-bar::-webkit-progress-bar {
            background-color: #97ddff;
        }
        .progress-bar::-webkit-progress-value {
            background-color: #334f5d;
        }

        .progress-bar::-moz-progress-bar {
            background-color: #334f5d;
        }
    }
</style>

<div style="position: relative; z-index: 9999">

    <div
        class={'fixed w-5/12'}
        style="top: 0px; left: 50%; transform: translate(-50%, 0%)">
        {#each feedbacks as feedback}
            <Transition
                toggle={feedback.active}
                transitions="transition transform"
                inTransition="ease-out duration-300"
                inState="opacity-0"
                onState="opacity-100"
                outState="opacity-0"
                outTransition="ease-in duration-200">
                <div class={feedback.variant}>
                    <div class="shadow w-100 feedback rounded-md m-4">
                        <div class="flex justify-between p-4">
                            <div>
                                <Icon
                                    class="pb-1"
                                    data={getRelevantIcon(feedback.variant)}
                                    scale="1.35" />
                                {feedback.text}
                            </div>
                            <div class="block">
                                <button
                                    on:click={() => (feedback.active = false)}
                                    class="appearance-none">
                                    <Icon data={faTimes} scale="1" />
                                </button>
                            </div>
                        </div>
                        {#if feedback.amount !== -1}
                            <progress
                                value={feedback.amount}
                                class="block w-full progress-bar" />
                        {/if}
                    </div>
                </div>
            </Transition>
        {/each}

    </div>
</div>
