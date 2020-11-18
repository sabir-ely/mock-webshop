<template>
    <div class="container-fluid m-0 p-0">
        <nav-bar></nav-bar>
        <spinner v-if="loading" />
        <template v-else>
            <transition mode="out-in" name="slide">
                <router-view></router-view>
            </transition>
        </template>

        <notifications classes="custom" position="top center" />
    </div>
</template>

<script>
import NavBar from "./NavBar";
import Spinner from "./Spinner";

export default {
    components: {
        NavBar,
        Spinner
    },

    data() {
        return {
            loading: true
        };
    },

    mounted() {
        this.$store.dispatch("fetchItems").then(() => {
            this.loading = false;
        });
    }
};
</script>

<style lang="scss" scoped>
.slide-leave-active,
.slide-enter-active {
    transition: 0.3s;
}
.slide-enter {
    transform: translate(100%);
}
.slide-leave-to {
    transition: opacity 0;
}
</style>
