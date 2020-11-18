<template>
    <div>
        <div class="item-name">
            <span v-if="!isEditingCount" @click="toggleEditingCount"
                >{{ entry.count }}x</span
            >
            <input
                v-else
                v-model.number="count"
                v-focus
                @blur="toggleEditingCount"
                @keypress.enter="toggleEditingCount"
                class="count-input"
                type="number"
                min="1"
                step="1"
            />
            <router-link :to="{ name: 'item', params: { id: entry.id } }">{{
                entry.item.title
            }}</router-link>
        </div>

        <div class="price">{{ price }}</div>
        <div class="remove">
            <button @click="remove" class="btn btn-sm btn-danger">X</button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { formatPrice } from "../util";

export default {
    props: ["entry"],

    data() {
        return {
            isEditingCount: false
        };
    },

    computed: {
        count: {
            get() {
                return this.entry.count;
            },
            set(val) {
                this.setCartCount({ id: this.entry.id, count: val });
            }
        },
        price() {
            return formatPrice(this.entry.count * this.entry.item.price);
        }
    },

    methods: {
        ...mapMutations(["removeFromCart", "setCartCount"]),
        formatPrice,

        toggleEditingCount() {
            this.isEditingCount = !this.isEditingCount;
        },

        remove() {
            const response = confirm(
                `Are you sure you want to remove ${this.entry.item.title} from your cart?`
            );
            if (response) {
                this.removeFromCart(this.entry);
            }
        }
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.item-name,
.remove,
.price {
    display: inline-block;
}

.remove {
    margin-right: 50px;
    float: right;
}

.btn-danger {
    padding: 2px;
    width: 20px;
}

.count-input {
    width: 80px;
    height: 20px;
}
</style>
