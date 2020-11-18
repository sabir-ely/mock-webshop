<template>
    <div id="index" class="row">
        <side-bar :class="collapse" class="col-sm-2 shadow-sm"></side-bar>
        <div class="col-sm-10">
            <button class="btn" @click="toggleCollapse">
                {{ buttonText }}
            </button>
            <ul id="item_list" class="list-unstyled row">
                <transition-group name="fade">
                    <li
                        v-for="item in items()"
                        :key="item.id"
                        class="col-lg-3 col-md-4 col-sm-6"
                    >
                        {{ item.name }}
                        <shop-item :item="item"></shop-item>
                    </li>
                </transition-group>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ShopItem from "./ShopItem";
import SideBar from "./SideBar";
import { formatPrice } from "../util";

export default {
    data() {
        return {
            collapse: "collapse.show"
        };
    },

    computed: {
        buttonText() {
            return this.collapse === "collapse" ? ">>" : "<<";
        }
    },

    methods: {
        ...mapGetters({ items: "getSortedItems" }),
        formatPrice,
        toggleCollapse() {
            this.collapse =
                this.collapse === "collapse" ? "collapse.show" : "collapse";
        }
    },
    components: {
        ShopItem,
        SideBar
    }
};
</script>

<style lang="scss" scoped>
ul {
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
}

li {
    display: inline-block;
}

.btn {
    margin-bottom: -30px;
}

.fade-enter-active {
    transition: opacity 0.5s;
}

.fade-leave-active {
    transition: opacity 0s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
