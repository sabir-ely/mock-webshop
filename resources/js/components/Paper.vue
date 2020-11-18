<template>
    <div class="paper container shadow-sm rounded">
        <div class="paper-content">
            <h1>{{ title }}</h1>
            <hr />
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ["title"]
};
</script>

<style>
.paper {
    min-width: 560px;
    width: 70%;
    background-color: white;
    margin-top: 50px;
    min-height: 500px;
    margin-bottom: 40px;
    overflow: auto;
}

.paper-content {
    padding-top: 40px;
    margin-left: 50px;
    margin-right: 50px;
    padding-bottom: 50px;
}
</style>
