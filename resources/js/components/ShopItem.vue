<template>
    <div class="card">
        <img class="card-img-top" />
        <div class="card-body p-0">
            <div class="card-content p-3">
                <h5 class="card-title">{{ item.title }}</h5>
                <p class="card-text">
                    {{ shortDescription }}
                </p>
            </div>
            <div class="card-footer">
                <div class="price">
                    {{ formatPrice(item.price) }}
                </div>
                <router-link
                    :to="{ name: 'item', params: { id: item.id } }"
                    class="btn btn-primary"
                    >View</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import { formatPrice } from "../util";

export default {
    props: ["item"],

    computed: {
        shortDescription() {
            return this.item.description.slice(0, 300) + "... ";
        }
    },
    methods: {
        formatPrice
    }
};
</script>

<style lang="scss" scoped>
.card {
    height: 250px;
    margin-bottom: 20px;
}

.card-content {
    height: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-footer {
    padding: 0;
    height: 20%;
    .price,
    .btn {
        width: 50%;
        height: 100%;
        padding: 10;
        margin: 0;
        float: left;
        text-align: center;
        border-radius: 0;
        border-bottom-right-radius: inherit;
    }
}
</style>
