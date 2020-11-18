<template>
  <div id="sidebar">
    <h5>Filters</h5>
    <hr />
    <form class="form-group">
      <input id="search-text" type="text" v-model="searchText" placeholder="Search" />
      <label for="min-price">Min. price: {{ formatPrice(minPrice) }}</label>
      <price-slider v-model.number="minPrice"></price-slider>
      <label for="max-price">Max. price: {{ formatPrice(maxPrice) }}</label>
      <price-slider v-model.number="maxPrice"></price-slider>
    </form>
    <hr />
    <h5>Sort</h5>
    <select id="sort-input" v-model="sort">
      <option selected>Sort by...</option>
      <option value="price-asc">Price, Ascending</option>
      <option value="price-desc">Price, Descending</option>
      <option value="az-asc">Alphabetical, Ascending</option>
      <option value="az-desc">Alphabetical, Descending</option>
    </select>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { formatPrice } from "../util";
import PriceSlider from "./PriceSlider";

export default {
  components: {
    PriceSlider,
  },

  computed: {
    ...mapState({
      getMinPrice: (state) => state.filters.price.min,
      getMaxPrice: (state) => state.filters.price.max,
      getSort: (state) => state.sort,
    }),
    minPrice: {
      get() {
        return this.getMinPrice;
      },
      set(val) {
        this.setMinPrice(val);
      },
    },
    maxPrice: {
      get() {
        return this.getMaxPrice;
      },
      set(val) {
        this.setMaxPrice(val);
      },
    },
    searchText: {
      get() {
        return this.$store.state.filters.searchText;
      },
      set(val) {
        this.setSearchText(val);
      },
    },
    sort: {
      get() {
        return this.getSort || "Sort by...";
      },
      set(val) {
        this.setSort(val);
      },
    },
  },

  methods: {
    ...mapMutations(["setMinPrice", "setMaxPrice", "setSearchText", "setSort"]),
    formatPrice,
  },
};
</script>

<style lang="scss" scoped>
#sidebar h5 {
  margin-top: 15px;
  margin-left: 10px;
  font-weight: bold;
}

form {
  margin-left: 10px;
}

#search-text {
  width: 100%;
  margin-bottom: 10px;
}

#sort-input {
  width: 90%;
  margin-left: 8%;
}
</style>
