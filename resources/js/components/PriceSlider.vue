<template>
  <input
    type="range"
    class="form-control-range"
    :id="id"
    :max="maxPossiblePrice"
    :min="minPossiblePrice"
    :value="value"
    @input="$emit('input', $event.target.value)"
    step="50"
  />
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { formatPrice } from "../util";

export default {
  props: ["id", "value"],

  methods: {
    formatPrice,
  },

  computed: {
    ...mapState(["items"]),
    ...mapGetters(["minPossiblePrice", "maxPossiblePrice"]),
  },
};
</script>

<style lang="scss" scoped>
</style>
