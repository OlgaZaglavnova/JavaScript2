<template>
    <form class="search-form" @input.prevent="filterGoods">
        <input type="text" class="good-search" v-model.trim="searchLine"/>
    </form>
</template>
<script>
    export default{
        name: 'SearchForm',
        data: () => ({
            searchLine: '',
        }),
        methods: {
            filterGoods(){
                this.$emit('filter-goods', this.searchLine);
            }
        },
    }
</script>
<style scoped>
    .search-form{
        float: left;
    }
</style>