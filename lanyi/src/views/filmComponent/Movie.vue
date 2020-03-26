<template>
    <div class="movie">
        <div class="movie-box" ref="moviebox" @scroll="lazyLoad">
            <div class="movie-item clearfix" ref="movieitem" @click="viewMovieDetail({name: 'movieDetail',params:{id: item.id}})" v-for="(item,index) in movieData.data.subjects" :key="index" :id="item.id">
                <div class="fl movie-img">
                    <img class="auto-img" :src="item.images.medium" alt="">
                </div>
                <div class="fl movie-info">
                    <div class="title one-text">{{item.title}}</div>
                    <div class="directors one-text">导演：{{item.directorsInfo}}</div>
                    <div class="casts one-text">主演：{{item.actorInfo}}</div>
                    <div class="genres">类型：{{item.genresInfo}}</div>
                </div>
                <div class="fl buy-info">
                    <div class="rating">{{item.rating.average}}<span>分</span></div>
                    <div class="buy">
                        <van-button @click.stop="buyBallot(item.id)" size="small" plain type="primary" color="#FF5757">购票</van-button>
                    </div>
                </div>
            </div>
            <p class="tip-text" v-if="!isHas">没有更多数据可加载...</p>
        </div>
    </div>
</template>

<script>
    
    import $ from 'jquery'

    import { createNamespacedHelpers  } from 'vuex'

    const { mapState } = createNamespacedHelpers('movieModule')
    
    export default {
        name: 'movie',

        computed: {

            ...mapState(['movieData','params','isInit','isHas','isInitial','movieBoxData','movieBox','soonData'])

        },

        methods: {

            getMovieData() {

                let self = this;

                this.$toast.loading({
                    duration: 0,
                    message: '加载中...',
                });
                   
                // 请求数据
                this.axios({
                    method: 'GET',
                    url: 'https://douban.uieee.com/v2/movie/in_theaters',
                    params: this.params
                }).then(result => {

                    result.data.subjects.forEach(v => {

                        // 合并导演
                        v.directorsInfo = '';
                        v.directors.forEach(k => {
                            v.directorsInfo += k.name + ' / '
                        });

                        v.directorsInfo = v.directorsInfo.slice(0,-3);

                        // 合并电影类型
                        v.genresInfo = v.genres.join(' ');

                        // 合并演员
                        v.actorInfo = '';
                        v.casts.forEach(item => {
                            v.actorInfo += item.name + ' / '
                        });

                        v.actorInfo = v.actorInfo.slice(0,-3);
                    });

                    // console.log('result ==> ',result);

                    if(this.isInit) {
                        let movieBox = this.$refs.moviebox;

                        // 528,可视窗口高度
                        let movieBoxHeight = movieBox.clientHeight;
                        
                        // console.log('movieBoxHeight ==> ',movieBoxHeight);

                        this.$store.commit('movieModule/changeMovieBox',{
                            movieBox,
                            movieBoxHeight
                        });

                    }

                    
                    this.$store.dispatch('movieModule/changeMovieData',result);

                    this.$toast.clear();

                }).catch(err => {
                    // console.log('err ==> ',err);
                    this.$toast.clear();
                }) 
            
            },
            
            // 查看电影详情
            viewMovieDetail(o) {
                this.$router.push(o);
            },

            // 滚动懒加载
            lazyLoad() {
                let self = this;

                if(!self.isHas) {
                    // console.log('没有更多数据可加载');
                    return;
                }

                // 函数节流与函数防抖
                let timer = setTimeout(function() {

                    for(let i = 1;i < self.movieBoxData.timers.length;i++) {
                        clearTimeout(self.movieBoxData.timers[i]);
                    }

                    let movieItem = self.$refs.movieitem[self.$refs.movieitem.length - 1];

                    // console.log('movieItem ==> ',movieItem);

                    // let movieItemMarginBottom = parseFloat(getComputedStyle(movieItem).marginBottom);

                    // console.log('movieItemMarginBottom ==> ',movieItemMarginBottom);

                    // 获取底部导航高度
                    let tabbarHeight = document.querySelector('.tar-bar').clientHeight;
                    // console.log('tabbarHeight ==> ',tabbarHeight);

                    // 获取元素距离可视区域顶部距离
                    let movieItemStyle = movieItem.getBoundingClientRect();

                    let top = movieItemStyle.top;
                    // console.log('top ==> ',top);

                    let movieItemHeight = movieItemStyle.height;
                    // console.log('movieItemHeight ==> ',movieItemHeight);

                    // 滚动条内的顶部隐藏部分的高度828
                    // console.log('that.scrollTop ==> ',that.scrollTop);

                    let isPass = innerHeight - tabbarHeight - movieItemHeight + 50 >= top;

                    if(isPass) {
                        // console.log('发起数据请求');

                        self.getMovieData();

                    }
                    
                    self.$store.state.movieModule.movieBoxData.timers = [];

                },1000)

                self.$store.state.movieModule.movieBoxData.timers.push(timer);
                // self.timers.push(timer);
            },

            // 购票
            buyBallot(id) {
                this.$router.push({name: 'buyTicket', query: {id}});
            }

        },

        created() {

            let self = this;

            // 获取用户位置
            $.ajax({
                type: 'GET',
                url: 'https://apis.map.qq.com/ws/location/v1/ip',
                data: {
                    key: 'W3KBZ-ZVE34-ZCGU3-DUDMB-JHFGO-UTBXU',
                    output: 'jsonp'
                },
                dataType: 'jsonp',
                success: function(data) {
                    // console.log('data ==> ',data);

                    self.$store.commit('movieModule/changeLocationCity',data.result.ad_info.city.replace(/市$/,''))

                    if(!self.isInitial) {
                        return;
                    }

                    self.getMovieData();
                }
            })
        },

    }
</script>

<style lang="less" scoped>
    .movie{
        position: fixed;
        top: 40px;
        bottom: 50px;
        left: 0;
        right: 0;
        .van-tabs{
            position: static;
        }
        .movie-box{
            position: absolute;
            top: 44px;
            left: 0;
            right: 0;
            bottom: 0;
            background: #fff;
            overflow-y: auto;
            padding: 0 10px;
            margin-top: 5px;
        }
        .tip-text{
            text-align: center;
            font-size: 12px;
            color: #b0b0b0;
            padding: 15px 0;
        }
        .movie-item{
            margin-top: 10px;
            border-bottom: 1px solid #eee;
        }
        .movie-img{
            width: 80px;
            height: 108px;
            overflow: hidden;
        }
        .movie-info{
            width: calc(~"100% - 140px - 20px");
            height: 120px;
            padding: 0 10px;
            .title{
                font-size: 20px;
                line-height: 25px;
                color: #333;
            }
            .directors{
                font-size: 14px;
                line-height: 25px;
                margin-top: 10px;
                color: #666;
            }
            .casts{
                line-height: 25px;
                font-size: 14px;
                color: #666;
            }
            .genres{
                line-height: 25px;
                font-size: 14px;
                color: #666;
            }
        }
        .buy-info{
            width: 60px;
            height: 120px;
        }
        .rating{
            font-size: 22px;
            text-align: center;
            color: #FF9000;
            line-height: 40px;
            >span{
                font-size: 14px;
            }
        }
        .buy{
            margin-top: 30px;
        }
    }
</style>