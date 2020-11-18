<template>
    <paper title="Your Cart">
        <ul class="list-unstyled">
            <li v-for="entry in cart" :key="entry.id">
                <shopping-cart-entry :entry="entry" />
            </li>
        </ul>
        <hr />
        <div id="cart-total">
            Total:
            <span>{{ getCartTotal }}</span>
        </div>
        <div class="button-container">
            <button
                @click="$router.go(-1)"
                id="back-button"
                class="btn btn-secondary"
            >
                Go Back
            </button>
            <router-link
                :to="{ name: 'checkout' }"
                id="checkout-button"
                class="btn btn-success"
                :class="{ disabled }"
                tag="button"
                :disabled="disabled"
                >Check out</router-link
            >
        </div>
    </paper>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Paper from "./Paper";
import ShoppingCartEntry from "./ShoppingCartEntry";

export default {
    components: {
        Paper,
        ShoppingCartEntry
    },

    computed: {
        ...mapState(["cart"]),
        ...mapGetters(["getCartTotal"]),
        disabled() {
            return this.cart.length === 0;
        }
    }
};
</script>

<style lang="scss">
.item-name {
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    color: black;
    a {
        text-decoration: none;
        &:visited,
        &:hover {
            text-decoration: none;
        }
    }
}

.price,
#cart-total {
    float: right;
    width: 60px;
    font-size: 18px;
    color: black;
    text-align: right;
    span {
        font-size: 20px;
        margin-left: 20px;
    }
}

#cart-total {
    width: 200px;
}

.item-name,
.remove,
.price,
#cart-total {
    display: inline-block;
}

#back-button,
#checkout-button {
    display: inline-block;
    padding: 10 30 10 30;
    font-size: 18px;
    width: 40%;
}

.button-container {
    width: 60%;
    margin: 0 auto;
    margin-top: 100px;
}
</style>
