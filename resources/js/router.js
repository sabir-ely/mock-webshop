import VueRouter from "vue-router";
import ShopIndex from "./components/ShopIndex";
import ShoppingCart from "./components/ShoppingCart";
import ShopItemDetails from "./components/ShopItemDetails";
import ShopCheckout from "./components/ShopCheckout";
import ShopConfirm from "./components/ShopConfirm";

Vue.use(VueRouter);

const routes = [
    {
        name: "index",
        path: "/",
        component: ShopIndex
    },
    {
        name: "cart",
        path: "/cart",
        component: ShoppingCart
    },
    {
        name: "item",
        path: "/item/:id",
        component: ShopItemDetails
    },
    {
        name: "checkout",
        path: "/checkout",
        component: ShopCheckout
    },
    {
        name: "confirm",
        path: "/confirm",
        component: ShopConfirm
    }
];

export const router = new VueRouter({
    routes
});
