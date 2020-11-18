<template>
    <div>
        <spinner v-if="processing" />
        <div v-else>
            <paper title="Thank you shopping at our webshop!">
                <p>
                    Your order will arrive soon!
                </p>
            </paper>
        </div>
    </div>
</template>

<script>
import Spinner from "./Spinner";
import Paper from "./Paper";

export default {
    components: {
        Spinner,
        Paper
    },
    computed: {
        processing() {
            return this.$store.state.processing;
        }
    }
};
</script>

<style></style>
