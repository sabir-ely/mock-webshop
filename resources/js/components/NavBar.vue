<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link :to="{ name: 'index' }" class="navbar-brand"
            >Webshop</router-link
        >
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#">Category 1</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Category 2</a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link
                        :to="{ name: 'cart' }"
                        id="cart-button"
                        class="nav-link btn btn-primary"
                        >Cart: {{ total }}</router-link
                    >
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { formatPrice } from "../util";

export default {
    computed: {
        total() {
            return this.$store.getters.getCartTotal;
        }
    }
};
</script>

<style lang="scss" scoped>
#cart-button {
    width: 150px;
    color: white;
    font-weight: bold;
}
</style>
