<template>
    <paper :title="item.title">
        <p>{{ item.description }}</p>
        <span id="item-price">Price: {{ formatPrice(item.price) }}</span>
        <br />
        <router-link id="go-to-cart" :to="{ name: 'cart' }">
            <span id="in-cart">In Cart: {{ inCart }}</span></router-link
        >
        <button id="add-to-cart" class="btn btn-primary" @click="add">
            Add to cart
        </button>
    </paper>
</template>

<script>
import { mapMutations } from "vuex";
import Paper from "./Paper";
import { formatPrice } from "../util";

export default {
    components: {
        Paper
    },

    computed: {
        item() {
            return this.$store.getters.getById(Number(this.$route.params.id));
        },
        inCart() {
            return (
                this.$store.state.cart.find(entry => entry.id === this.item.id)
                    ?.count || 0
            );
        }
    },
    methods: {
        ...mapMutations(["addToCart"]),
        formatPrice,

        add(ev) {
            this.addToCart(this.item);
            this.$notify({
                title: "Item added to your cart",
                text: `${this.item.title} successfully added to your cart`
            });
            ev.target.disabled = true;
            setTimeout(() => (ev.target.disabled = false), 1000);
        }
    }
};
</script>

<style lang="scss" scoped>
button#add-to-cart {
    width: 200px;
    height: 60px;
    float: right;
}

#in-cart,
#add-to-cart,
#item-price {
    font-size: 25px;
}

#in-cart {
    text-decoration: underline;
}

#item-price {
    padding-top: 40px;
}
</style>
