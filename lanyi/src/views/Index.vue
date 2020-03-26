<template>
    <div class="index">

        <div>
            <!-- 二级路由 -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>

        <van-tabbar class="tar-bar" v-model="tabbarActive" active-color="#8389E0">
            <van-tabbar-item @click="togglePage({name: item.name})" v-for="(item,index) in tabbarData" :key="index" :name="item.name" :icon="item.icon">{{item.title}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>

    import { createNamespacedHelpers } from 'vuex'

    const { mapState } = createNamespacedHelpers('indexModule')

    export default {
        name: 'index',

        data() {
            return {
                tabbarActive: 'home',
            }
        },

        computed: {
            ...mapState(['tabbarData']),
        },

        methods: {
            togglePage(o) {
                this.$router.push(o);
            }
        },

        created() {
            this.tabbarActive = this.$route.name;
        }
    }
</script>

<style lang="less" scoped>
    .index{
        padding-bottom: 1.33333rem; 
    }
</style>