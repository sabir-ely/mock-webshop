import Vuex from "vuex";
import search from "fuzzysearch";
import { formatPrice } from "./util";

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        items: [],
        sort: undefined,
        filters: {
            price: {
                min: 0,
                max: 0
            },
            searchText: ""
        },
        cart: [],
        processing: false
    },

    mutations: {
        addItems: (state, payload) => {
            state.items = state.items.concat(payload.items);
        },
        setMinPrice: (state, payload) => {
            state.filters.price.min = payload;
        },
        setMaxPrice: (state, payload) => {
            state.filters.price.max = payload;
        },
        setSearchText: (state, payload) => {
            state.filters.searchText = payload;
        },
        setSort(state, payload) {
            state.sort = payload;
        },
        addToCart: (state, payload) => {
            const newEntries = !Array.isArray(payload) ? [payload] : payload;
            newEntries.forEach(newEntry => {
                const currentEntry = state.cart.find(
                    entry => entry.id === newEntry.id
                );

                if (currentEntry) {
                    state.cart = state.cart.map(entry => {
                        if (entry.id === currentEntry.id) {
                            return {
                                ...currentEntry,
                                count: currentEntry.count + 1
                            };
                        } else {
                            return entry;
                        }
                    });
                } else {
                    state.cart = [
                        ...state.cart,
                        {
                            id: newEntry.id,
                            count: 1,
                            item: newEntry
                        }
                    ];
                }
            });
        },
        removeFromCart: (state, payload) => {
            state.cart = state.cart.filter(entry => entry !== payload);
        },
        setCartCount: (state, payload) => {
            state.cart = state.cart.map(entry => {
                if (entry.id === payload.id) {
                    return {
                        ...entry,
                        count: payload.count
                    };
                } else {
                    return entry;
                }
            });
        },

        setProcessing: (state, payload) => {
            state.processing = payload;
        }
    },

    actions: {
        fetchItems({ commit, getters }) {
            return axios.get("/api/item?limit=20").then(res => {
                if (res.status === 200) {
                    const items = res.data;
                    commit("addItems", { items });
                    commit("setMinPrice", getters.minPossiblePrice);
                    commit("setMaxPrice", getters.maxPossiblePrice);
                }
            });
        }
    },
    getters: {
        getById: ({ items }) => id => {
            return items.find(item => item.id === id);
        },

        maxPossiblePrice({ items }) {
            const max = _.maxBy(items, "price").price;
            return _.ceil(max, -2) + 100;
        },

        minPossiblePrice({ items }) {
            const min = _.minBy(items, "price").price;
            return _.floor(min, -2);
        },
        getFilteredItems({ items, filters }) {
            return items.filter(
                item =>
                    item.price <= filters.price.max &&
                    item.price >= filters.price.min &&
                    search(
                        filters.searchText.toLowerCase(),
                        item.title.toLowerCase()
                    )
            );
        },
        getSortedItems({ sort }, { getFilteredItems: items }) {
            switch (sort) {
                case "price-asc":
                    return _.sortBy(items, "price");
                case "price-desc":
                    return _.sortBy(items, "price").reverse();
                case "az-asc":
                    return _.sortBy(items, "title");
                case "az-desc":
                    return _.sortBy(items, "title").reverse();
                default:
                    return items.sort();
            }
        },

        getCartTotal({ cart }) {
            return formatPrice(
                cart.reduce(
                    (acc, curr) => acc + curr.count * curr.item.price,
                    0
                )
            );
        }
    }
});
