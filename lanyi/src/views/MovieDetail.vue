<template>
    <div class="movie-detail">
        <div class="main-bg" :style="{'background-image': 'linear-gradient(to bottom,rgba(245,245,245,.1),rgba(245,245,245,.85) 50%,rgba(255,255,255,1) 60%), url(' + movieDetailData.images.large + ')'}">

        </div>
        <div class="detail-header">
            <van-nav-bar
                title="电影详情"
                left-text="返回"
                left-arrow
                @click-left="back()"
            />
        </div>
        <div class="main-content">
            <div class="movie-msg clearfix">
                <div class="movie-image fl">
                    <img class="auto-img" :src="movieDetailData.images.medium" alt="">
                </div>
                <div class="detail-msg fl">
                    <div class="detail-name one-text">{{movieDetailData.title}}</div>
                    <div class="detail-eng one-text">{{movieDetailData.original_title}}</div>
                    <div class="detail-type">{{movieDetailData.genresInfo}}</div>
                    <div class="m-info clearfix">
                        <div class="fl"><span><van-icon name="play-circle-o" /></span>{{movieDetailData.mainland_pubdate}}</div>
                        <div class="fl"><span><van-icon name="clock-o" /></span>{{movieDetailData.durations[0]}}</div>
                        <div class="fl"><span><van-icon name="chat-o" /></span>{{movieDetailData.comments}}</div>
                    </div>
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
                            <div class="yes-star" :style="{width: movieDetailData.width + 'px'}">
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
                        <div class="fl star-grade">{{movieDetailData.rating.average}}</div>
                    </div>
                </div>
            </div>
            <div class="detail-info">
                <div class="synopsis" :style="{display}">{{movieDetailData.summary}}</div>
                <div class="arrow" @click="changeDisplay">
                    <van-icon name="arrow-down" />
                </div>
            </div>
            <div class="tab">
                <van-tabs v-model="activeName" :border="false" color="#C785C8">
                    <van-tab title="演员信息" name="a">
                        <div class="actor-content">
                            <div class="actor-msg clearfix" :style="{width: movieDetailData.casts.length * movieDetailData.w + (movieDetailData.casts.length - 1) * movieDetailData.mr + 'px'}">
                                <div class="actor-item fl" ref="actor" v-for="(item,index) in movieDetailData.casts" :key="index">
                                    <div class="actor-img">
                                        <img class="auto-img" :src="item.avatars.medium" alt="">
                                    </div>
                                    <div class="actor-name one-text">{{item.name}}</div>
                                </div>
                            </div>
                        </div>
                        
                    </van-tab>
                    <van-tab title="影视花絮" name="b">
                        <div class="video-url" v-for="(item,index) in movieDetailData.trailers" :key="index">
                            <video class="auto-img" :src="item.resource_url" controls></video>
                        </div>
                    </van-tab>
                    <van-tab title="热门评论" name="c">
                        <div class="comment-item-box">
                            <div class="discuss-box clearfix">
                                <textarea rows="3"></textarea>
                                <div class="send">发表</div>
                            </div>
                            <div class="comment-item" v-for="(item,index) in movieDetailData.popular_comments" :key="index">
                                <div class="clearfix">
                                    <div class="comment-img fl">
                                        <img :src="item.author.avatar" alt="">
                                    </div>
                                    <div class="fl comment-msg">
                                        <div class="comment-name one-text">{{item.author.name}}</div>
                                        <div class="comment-time">{{item.created_at}}</div>
                                    </div>
                                </div>
                                <div class="popular-comments">{{item.content}}</div>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <div class="detail-footer clearfix">
            <div class="like-box fl">
                <van-icon class="like" name="like-o" />
                <p>想看</p>
            </div>
            <div class="collect-box fl" @click="collectMovie(movieDetailData)">
                <div class="collect-box-count">
                    <van-icon class="collect" name="star-o" />
                    <van-icon class="c-active" v-show="collectActive" color="#FFF200" name="star" />
                </div>
                <p>收藏</p>
            </div>
            <div class="btn" @click="buyTicket(movieDetailData.id)">立即购票</div>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';

    const { mapState,mapMutations } = createNamespacedHelpers('movieDetailModule')

    export default {
        name: 'movieDetail',

         data() {
            return {
            activeName: 'a'
            };
        },

        computed: {
            ...mapState(['movieDetailData','display','collectActive'])
        },

        methods: {
            ...mapMutations(['changeDisplay','resetState','changecollectActive']),

            // 返回上一步
            back() {
                this.$router.go(-1);
            },

            // 收藏电影
            collectMovie(item) {
                // console.log('item ==> ',item);

                // 获取用户登录状态
                let userStatus = localStorage.getItem('user');

                if(userStatus) {
                    userStatus = JSON.parse(userStatus);

                    if(!userStatus.isLogin) {
                        // console.log('请先登录');
                        return this.$router.push({name: 'login'});
                    }

                    // 获取用户收藏的电影
                    let collectMovieData = localStorage.getItem('collectMovieData');
                    collectMovieData = collectMovieData ? JSON.parse(collectMovieData) : {};

                    // 记录当前用户收藏的电影
                    let currentCollectData = collectMovieData[userStatus.username];

                    if(!currentCollectData) {
                        collectMovieData[userStatus.username] = [];
                    }

                    // 收藏电影之前，根据电影的id判断是否已经收藏过该电影
                    for(let i = 0;i < collectMovieData[userStatus.username].length;i++) {
                        if(collectMovieData[userStatus.username][i].id == item.id) {
                            // 提示用户
                            this.$toast('你已收藏过该电影');
                            return;
                        }
                    }

                    this.$store.commit('movieDetailModule/changecollectActive', true);

                    // 将电影推进collectMovieData[userStatus.username]
                    collectMovieData[userStatus.username].unshift(item);

                    // console.log('collectMovieData ==> ',collectMovieData);

                    localStorage.setItem('collectMovieData', JSON.stringify(collectMovieData));

                    this.$toast.success('收藏成功');

                }else {
                    // console.log('请先登录');
                    this.$router.push({name: 'login'});
                }
            },

            // 购票
            buyTicket(id) {
                this.$router.push({name: 'buyTicket', query: {id}});
            }
        },

        created() {

            this.$toast.loading({
                duration: 0,
                message: '加载中...'
            });

            // 重置state
            this.resetState();

            // 截取路由参数
            let id = this.$route.params.id;

            // console.log('id ==> ',id);

            this.axios({
                method: 'GET',
                url: 'https://douban.uieee.com/v2/movie/subject/' + id
            }).then(result => {

                this.$toast.clear();

                // console.log('result ==> ',result);

                // 合并电影类型
                result.data.genresInfo = result.data.genres.join(' ');

                let comments = result.data.comments_count;

                result.data.comments = comments >= 10000 ? (comments / 10000).toFixed(1) + 'w': comments >= 1000 ? (comments / 1000).toFixed(1) + 'k' : comments;

                // 获取星星宽度
                let nostarWidth = this.$refs.nostar.clientWidth;

                result.data.width = result.data.rating.average / result.data.rating.max * nostarWidth;

                // 获取演员盒子宽度
                result.data.w = 0;
                result.data.mr = 0;

                this.$store
                    .dispatch('movieDetailModule/getMovieDetailData',result.data)
                    .then(() => {
                        this.$toast.clear();

                        let actorBoxWidth = parseFloat(getComputedStyle(this.$refs.actor[0]).width);

                        let actorBoxMr = parseFloat(getComputedStyle(this.$refs.actor[0]).marginRight);

                        // console.log('actorBoxWidth ==> ',actorBoxWidth);

                        this.$store.commit('movieDetailModule/changeW',actorBoxWidth);

                        this.$store.commit('movieDetailModule/changeMr',actorBoxMr);

                        // 根据用户登录状态，判断该电影是否被该用户收藏
                        let userStatus = localStorage.getItem('user');
                        
                        let isActive = userStatus && JSON.parse(userStatus).isLogin;

                        // 如果用户登录
                        if(isActive) {
                            let username = JSON.parse(userStatus).username;

                            // 所有用户收藏的电影
                            let collectMovieData = localStorage.getItem('collectMovieData');

                            collectMovieData = collectMovieData ? JSON.parse(collectMovieData) : {};

                            // 获取当前用户收藏的电影
                            let currentCollectData = collectMovieData[username];

                            currentCollectData = currentCollectData ? currentCollectData: [];

                            for(let i = 0;i < currentCollectData.length;i++) {
                                if(this.movieDetailData.id == currentCollectData[i].id) {
                                    this.$store.commit('movieDetailModule/changecollectActive',true);
                                    return;
                                }
                            }

                            this.$store.commit('movieDetailModule/changecollectActive',false);
                        }else {
                            this.$store.commit('movieDetailModule/changecollectActive',false);
                        }
                        
                    })

                this.$store.commit('movieDetailModule/getMovieDetailData',result.data);


            }).catch(err => {

                this.$toast.clear();
                // console.log('err ==> ',err);

            })

        }
    }
</script>

<style lang="less" scoped>
    .movie-detail{
        textarea{
            resize: none;
            width: calc(~"100% - 12px");
            border: 0;
            padding: 5px;
            font-size: 14px;
        }
        .main-content{
            overflow-y: auto;
            min-height: 560px;
        }
        .detail-header{
            position: sticky;
            top: 0;
            left: 0;
            z-index: 19;
        }
        .detail-info{
            background: #fff;
            margin: 205px 0 0;
            border-radius: 10px;
            padding: 50px 15px 40px;
            position: relative;
            z-index: 1;
        }
        .arrow{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 10px;
            margin: 0 auto;
            width: 20px;
            height: 20px;
            font-size: 16px;
            text-align: center;
        }
        .main-bg{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            z-index: -1;
            filter: blur(5px);
        }
        .movie-msg{
            position: absolute;
            top: 100px;
            left: 0;
            width: calc(~"100% - 30px");
            padding: 15px;
            color: #7030A0;
            z-index: 2;
            .movie-image{
                width: 120px;
                overflow: hidden;
                border-radius: 5px;
                margin-right: 10px;
            }
            .detail-msg{
                margin-top: 25px;
                width: calc(~"100% - 130px");
            }
        }
        .detail-name{
            font-size: 22px;
            color: #7030A0;
        }
        .detail-eng{
            font-size: 14px;
            color: #A349A4;
            line-height: 20px;
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
            margin-top: 15px;
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
        .synopsis{
            line-height: 20px;
            font-size: 14px;
            text-indent: 2em;
            color: #666;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .tab{
            border-top: 1px solid #eee;
            background: #fff;
        }
        .detail-footer{
            position: sticky;
            bottom: 0;
            left: 0;
            border-top: 1px solid #eee;
            background: #fff;
            height: 60px;
            z-index: 29;
        }
        .actor-msg{
            padding: 15px 15px 10px;
        }
        .actor-img{
            width: 100px;
            height: 142px;
            border-radius: 10px;
            overflow: hidden;
        }
        .actor-name{
            font-size: 14px;
            text-align: center;
            margin-top: 5px;
        }
        .actor-content{
            overflow-x: auto;
        }
        .actor-item{
            margin-right: 10px;
            width: 100px;
            &:last-child{
                margin-right: 0;
            }
        }
        .btn{
            width: 200px;
            height: 40px;
            background: #ff9700;
            text-align: center;
            line-height: 40px;
            border-radius: 10px;
            position: absolute;
            right: 20px;
            top: 0;
            bottom: 0;
            margin: auto;
            color: #fff;
            font-size: 16px;
            letter-spacing: 2px;
            border-bottom: 2px solid #BF5B16;
        }
        .btn:active{
            border-bottom: 0;
        }
        .video-url{
            padding: 10px;
            width: calc(~"100% - 20px");
            position: relative;
        }
        .comment-item-box{
            padding: 10px;
            width: calc(~"100% - 20px");
        }
        .comment-item{
            border: 1px solid #eee;
            border-radius: 10px;
            padding: 10px;
            margin-top: 10px;
        }
        .comment-item:first-child{
            margin-top: 0;
        }
        .comment-img{
            width: 48px;
            height: 48px;
            border-radius: 50%;
            overflow: hidden;
        }
        .comment-msg{
            width: calc(~"100% - 48px - 15px");
            margin-left: 15px;
        }
        .comment-name{
            font-size: 16px;
            line-height: 25px;
            margin-top: 5px;
            color: #333;
        }
        .comment-time{
            color: #555;
        }
        .popular-comments{
            margin-top: 10px;
            font-size: 14px;
            line-height: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: #8389E0;
        }
        .discuss-box{
            border: 1px solid #eee;
        }
        .send{
            width: 60px;
            height: 30px;
            border-radius: 5px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            font-size: 16px;
            background: #00B0F0;
            float: right;
            margin-bottom: 5px;
            margin-right: 5px;
        }
        .like-box{
            margin: 10px 20px;
            width: 40px;
            height: 40px;
            text-align: center;
        }
        .like{
            font-size: 25px;
        }
        .collect-box{
            margin-top: 10px;
            width: 40px;
            height: 40px;
            bottom: 0;
            margin: auto;
            text-align: center;
        }
        .collect-box-count{
            position: relative;
            height: 25px;
            width: 25px;
            margin: 10px auto 2px;
        }
        .collect{
            font-size: 25px;
            position: absolute;
            left: 0;
            right: 0;
        }
        .c-active{
            position: absolute;
            left: 0;
            right: 0;
            font-size: 25px;
        }
    }
</style>