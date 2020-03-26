<template>
    <div class="collect-movie">
        <div class="detail-header">
            <van-nav-bar
                title="我的收藏"
                left-text="返回"
                left-arrow
                @click-left="back()"
            />
        </div>
        <div class="c-content">
            <div class="movie-msg clearfix" :id="item.id" @click="viewMovieDetail({name: 'movieDetail', params: {id: item.id}})" v-for="(item,index) in currentCollectData" :key="index">
                <div class="movie-image fl">
                    <img class="auto-img" :src="item.images.medium" alt="">
                </div>
                <div class="detail-msg fl">
                    <div class="detail-name one-text">{{item.title}}</div>
                    <div class="detail-type">{{item.genresInfo}}</div>
                    <div class="m-info clearfix">{{item.mainland_pubdate}}在大陆上映</div>
                    <div class="star-box clearfix">
                        <div class="fl star-box-count">
                            <!-- 未激活 -->
                            <div ref="nostar" class="no-star">
                                <span>
                                    <van-icon name="star" />
                                </span>
                                <span>
                                    <van-icon name="star" />
                                </span>
                                <span>
                                    <van-icon name="star" />
                                </span>
                                <span>
                                    <van-icon name="star" />
                                </span>
                                <span>
                                    <van-icon name="star" />
                                </span>
                            </div>
                            <!-- 已激活 -->
                            <div class="yes-star" :style="{width: item.width + 'px'}">
                                <span>
                                    <van-icon name="star" />
                                </span>
                                <span>
                                    <van-icon name="star" />
                                </span>
                                <span>
                                    <van-icon name="star" />
                                </span>
                                <span>
                                    <van-icon name="star" />
                                </span>
                                <span>
                                    <van-icon name="star" />
                                </span>
                            </div>
                        </div>
                        <div class="fl star-grade">{{item.rating.average}}</div>
                    </div>
                </div>
                <van-icon class="delete" @click.stop="deleteCollect(item.id)" name="delete" />
            </div>
        </div>
        
    </div>
</template>

<script>

    import {createNamespacedHelpers} from 'vuex'

    const {mapState} = createNamespacedHelpers('collectModule');

    export default {

        name: 'collectMovie',

        computed: {
            ...mapState(['currentCollectData'])
        },

        methods: {
            // 返回上一步
            back() {
                this.$router.go(-1);
            },

            // 查看电影详情
            viewMovieDetail(o) {
                this.$router.push(o);
            },

            // 删除收藏的电影
            deleteCollect(id) {
                
                for(let i = 0;i < this.currentCollectData.length;i++) {
                    if(id == this.currentCollectData[i].id) {
                        this.$store.dispatch('collectModule/deleteCollect', i)
                        .then(() => {
                            let userStatus = JSON.parse(localStorage.getItem("user"));

                            // 获取所有用户收藏的电影数据
                            let collectMovieData = JSON.parse(localStorage.getItem('collectMovieData'));

                            collectMovieData[userStatus.username] = this.currentCollectData;

                            localStorage.setItem('collectMovieData', JSON.stringify(collectMovieData));
                        });
                        break;
                    }
                }
            }
        },

        created() {
            // 验证登录
            let userStatus = localStorage.getItem('user');

            if(userStatus) {
                let userInfo = JSON.parse(userStatus);

                // 如果登录
                if(userInfo.isLogin) {

                    // 开启加载提示
                    this.$toast.loading({
                        duration: 0,
                        message: '加载中...',
                    });

                    // 获取所有用户收藏的电影数据
                    let collectMovieData = localStorage.getItem('collectMovieData');

                    collectMovieData = collectMovieData ? JSON.parse(collectMovieData) : {};

                    // 获取当前用户收藏的电影数据
                    let currentCollectData = collectMovieData[userInfo.username];

                    currentCollectData = currentCollectData ? currentCollectData : [];

                    // 生成页面数据
                    this.$store.commit('collectModule/getCurrentCollectData', currentCollectData);

                    this.$toast.clear();

                }else {
                    // 如果未登录
                    this.$router.push({name: 'login'});
                }
            }else {
                // 未登录
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style lang="less" scoped>
    .collect-movie{
        .detail-header{
            position: sticky;
            top: 0;
            left: 0;
            z-index: 19;
        }
        .c-content{
            overflow-y: auto;
        }
        .movie-msg{
            // box-shadow: 0 1px 15px #909090;
            border-bottom: 1px solid #AAAEEB;
            border-top: 1px solid #AAAEEB;
            margin-top: 30px;
            position: relative;
            background: #fff;
            width: calc(~"100% - 30px");
            padding: 10px 15px;
            color: #8389E0;
            z-index: 2;
            .movie-image{
                margin-top: -30px;
                width: 100px;
                overflow: hidden;
                border-radius: 5px;
                margin-right: 10px;
            }
            .detail-msg{
                width: calc(~"100% - 130px");
            }
        }
        .detail-name{
            font-size: 18px;
            font-weight: bold;
            color: #8389E0;
        }
        .detail-type{
            font-size: 14px;
            margin-top: 10px;
        }
        .m-info{
            margin-top: 10px;
            >div{
                margin-right: 10px;
                >span{
                    position: relative;
                    top: 1.5px;
                }
            }
        }
        .star-box{
            margin-top: 5px;
        }
        .star-box-count{
            position: relative;
            width: 100px;
            margin-right: 5px;
            color: #ddd;
            span{
                position: absolute;
                width: 20px;
                height: 20px;
                font-size: 18px;
                top: 0;
                &:nth-child(1){
                    left: 0;
                }
                &:nth-child(2){
                    left: 20px;
                }
                &:nth-child(3){
                    left: 40px;
                }
                &:nth-child(4){
                    left: 60px;
                }
                &:nth-child(5){
                    left: 80px;
                }
            }
        }
        .no-star{
            height: 20px;
        }
        .yes-star{
            height: 20px;
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            color: #ff9000;
            overflow: hidden;
        }
        .star-grade{
            font-size: 18px;
            color:#ff9000;
            height: 18px;
            line-height: 18px;
        }
        .delete{
            font-size: 22px;
            position: absolute;
            top: 10px;
            right: 10px;
            color: #404040;
        }
    }
</style>