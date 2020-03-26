<template>
    <div class="home">
        <div class="search-box">
            <van-search placeholder="请输入搜索关键词" show-action>
                <div slot="action">搜索</div>
            </van-search>
        </div>
        <div class="content-box">
            <div>
                <van-swipe :autoplay="3000" indicator-color="white">
                    <van-swipe-item>
                        <img class="auto-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576073875955&di=910c1acc15c5cbe5243ce2226f658b2b&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fee175b7311406da8731601b332fc48688bceb995.jpg" alt="">
                    </van-swipe-item>
                    <van-swipe-item>
                        <img class="auto-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576074058518&di=357f17036b9cf9dbe5afa3be60dc2445&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-11-21%2F5a13bcce3d3c9.jpg" alt="">
                    </van-swipe-item>
                    <van-swipe-item>
                        <img class="auto-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576074347130&di=54fce9815785811f25d30bc5f03cc6df&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn10110%2F600%2Fw1920h1080%2F20190712%2Fddfc-hzrevqa3869977.jpg" alt="">
                    </van-swipe-item>
                    <van-swipe-item>
                        <img class="auto-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576669475&di=e22c335731ed4a36abc3cb9b3b0a33c8&imgtype=jpg&er=1&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201401%2F01%2F223239lxiqrh0xr26qigyh.jpg" alt="">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="clearfix nav-box">
                <div class="fl nav">
                    <div class="icons-box"></div>
                    <div class="word">最新预告</div>
                </div>
                <div class="fl nav">
                    <div class="icons-box"></div>
                    <div class="word">历史榜单</div>
                </div>
                <div class="fl nav">
                    <div class="icons-box"></div>
                    <div class="word">口碑榜</div>
                </div>
            </div>
            <!-- 新片榜 -->
            <div class="new-movie">
                <div class="new-movie-title clearfix">
                    <span class="fl">新片榜</span>
                    <span class="fr">全部({{newMovieData.length}})<van-icon name="arrow" /></span>
                </div>
                <div class="new-movie-content">
                    <div class="new-movie-box clearfix">
                        <div class="new-movie-item" v-for="(item,index) in newMovieData" :key="index" :id="item.id" @click="viewMovieDetail({name: 'movieDetail',params:{id: item.id}})">
                            <div class="movie-img">
                                <img class="auto-img" :src="item.images.medium" alt="">
                            </div>
                            <div class="movie-name one-text">{{item.title}}</div>
                            <div class="star-box clearfix">
                                <div class="fl star-box-count">
                                    <!-- 未激活 -->
                                    <div ref="noactive" class="no-star">
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
                                <div class="fr star-grade">{{item.rating.average}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 欧美榜 -->
            <div class="new-movie">
                <div class="new-movie-title clearfix">
                    <span class="fl">欧美榜</span>
                    <span class="fr" @click="changeWestMovie()">换一换</span>
                </div>
                <div class="west-movie-content">
                    <div class="west-movie-box clearfix">
                        <div class="west-movie-item" v-for="(item,index) in showWestMovieData.data" :key="index"  :id="item.subject.id"  @click="viewMovieDetail({name: 'movieDetail',params:{id: item.subject.id}})">
                            <div class="west-movie-img">
                                <img class="auto-img" :src="item.subject.images.medium" alt="">
                            </div>
                            <div class="like-icon">
                                <img class="auto-img" src="../../assets/image/like.png" alt="">
                            </div>
                            <div class="one-text west-name">{{item.subject.title}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {createNamespacedHelpers} from 'vuex'

    const {mapState,mapMutations,mapActions} = createNamespacedHelpers('homeModule')

    export default {
        name: 'home',

        computed: {
            ...mapState(['baseUrl','newMovieData','westMovieData','showWestMovieData','isHasData','isInit'])
        },

        methods: {
            changeWestMovie() {

                if(this.isHasData) {
                    
                    this.$store.commit('homeModule/toggleWestMovie');
                }
                
            },

            // 查看电影详情
            viewMovieDetail(o) {
                this.$router.push(o);
            }
        },

        created() {

            if(!this.isInit) {
                return;
            }
            
            this.$toast.loading({
                duration: 0,
                message: '加载中...',
            });

            // return;
            this.axios({
                method: 'GET',
                url: this.baseUrl + '/new_movies'
            }).then(result => {
                // console.log('result ==> ',result); 

                result.data.subjects.forEach(v => {
                    v.width = 0;
                });

                // 提交actions
                this.$store
                    .dispatch('homeModule/getNewMovieData',result.data.subjects)
                    .then(() => {

                        // 根据星际平均分设置宽度
                        let width = this.$refs.noactive[0].clientWidth;
                        // console.log('width ==> ',width);

                        this.$store.commit('homeModule/modifyNewMovieData',width);

                    })

            }).catch(err => {
                // console.log('err ==> ',err);
            })

            this.axios({
                method: 'GET',
                url: this.baseUrl + '/us_box'
            }).then(results => {
                // console.log('results ===> ',results); 

                this.$store.commit('homeModule/getWestMovieData',results.data.subjects);

                this.$toast.clear();

            }).catch(err => {
                // console.log('err ==> ',err);

                this.$toast.clear();
            })
        }
    }
</script>

<style lang="less" scoped>
    .home{
        .search-box{
            position: sticky;
            top: 0;
            left: 0;
            z-index: 10;
        }
        .content-box{
            overflow-y: auto;
        }
        .nav-box{
            padding: 10px;
            background: #fff;
        }
        .nav{
            width: calc(~"(100% -20px) / 3");
            text-align: center;
            &:nth-child(1) {
                .icons-box{
                    background: #FF5757 url(../../assets/image/05.png) no-repeat center center;
                    background-size: 30px 30px;
                }
            }
            &:nth-child(2) {
                .icons-box{
                    background: #FF5757 url(../../assets/image/06.png) no-repeat center center;
                    background-size: 30px 30px;
                }
            }
            &:nth-child(3) {
                .icons-box{
                    background: #FF5757 url(../../assets/image/07.png) no-repeat center center;
                    background-size: 30px 30px;
                }
            }
        }
        .icons-box{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: auto;
        }
        .word{
            color: #888;
            margin-top: 5px;
        }
        .new-movie{
            padding: 0 10px;
            background: #fff;
            margin-top: 10px;
        }
        .new-movie-title{
            line-height: 40px;
            >span:nth-child(1) {
                font-size: 18px;
                font-weight: bold;
            }
            >span:nth-child(2) {
                color: #666;
                font-size: 14px;
            }
        }
        .new-movie-content{
            background: #fff;
            padding: 10px 0;
            overflow-x: auto;
            overflow-y: hidden;
        }
        .new-movie-box{
            width: 1568px;
            .new-movie-item{
                width: 121.5px;
                margin-right: 10px;
                float: left;
            }
            .new-movie-item:last-child{
                margin-right: 0;
            }
        }
        .movie-img{
            height: 162px;
            border-radius: 5px;
            overflow: hidden;
        }
        .movie-name{
            text-align: center;
            padding: 10px 0;
            font-size: 16px;
            color: #666;
        }
        .star-box-count{
            position: relative;
            width: 90px;
            margin-right: 5px;
            color: #ddd;
            span{
                position: absolute;
                width: 18px;
                height: 18px;
                font-size: 16px;
                top: 0;
                &:nth-child(1){
                    left: 0;
                }
                &:nth-child(2){
                    left: 18px;
                }
                &:nth-child(3){
                    left: 36px;
                }
                &:nth-child(4){
                    left: 54px;
                }
                &:nth-child(5){
                    left: 72px;
                }
            }
        }
        .no-star{
            height: 18px;
        }
        .yes-star{
            height: 18px;
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            color: #ff9000;
            overflow: hidden;
        }
        .star-grade{
            text-align: center;
            font-size: 16px;
            width: calc(~"100% - 95px");
            color:#ff9000;
            height: 18px;
            line-height: 18px;
        }
        .west-movie-content{
            padding: 0 0 10px;
        }
        .west-movie-item{
            float: left;
            width: calc(~"(100% - 20px) / 3");
            margin-right: 10px;
            margin-top: 10px;
            position: relative;
            &:nth-child(3n){
                margin-right: 0;
            }
        }
        .west-movie-img{
            height: 159px;
            overflow: hidden;
            border-radius: 10px;
        }
        .like-icon{
            position: absolute;
            top: 5px;
            right: 5px;
            width: 25px;
            height: 25px;
        }
        .west-name{
            position: absolute;
            bottom: 0;
            left: 0;
            height: 30px;
            width: 100%;
            background-image: linear-gradient(to right, rgba(25,25,25,.9),rgba(175,175,175,.1));
            color: #fff;
            line-height: 30px;
            font-size: 16px;
            text-indent: 5px;
            letter-spacing: 1px;
        }
    }
</style>