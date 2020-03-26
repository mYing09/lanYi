<template>
  <div class="mine">
    <div class="app-logo">
        <div class="head-sculpture">
            <div class="logo fl"></div>
            <div class="username fl">{{userInfo.username}}</div>
        </div>
    </div>
    <div class="mine-content">
        <div>
            <van-grid :border="false">
                <van-grid-item icon="coupon-o" text="我的订单" />
                <van-grid-item @click="viewCollectMovie()" icon="star-o" text="我的收藏" />
                <van-grid-item icon="description" text="我的影评" />
                <van-grid-item icon="balance-pay" text="优惠券" />
            </van-grid>
        </div>
        <div class="list">
            <van-cell title="看过的电影" icon="like-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon
                slot="right-icon"
                name="arrow"
                style="line-height: inherit;"
            />
            </van-cell>
            <van-cell title="我的资料" icon="notes-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon
                slot="right-icon"
                name="arrow"
                style="line-height: inherit;"
            />
            </van-cell>
            <van-cell title="设置" icon="setting-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon
                slot="right-icon"
                name="arrow"
                style="line-height: inherit;"
            />
            </van-cell>
            <van-cell title="帮助与反馈" icon="friends-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon
                slot="right-icon"
                name="arrow"
                style="line-height: inherit;"
            />
            </van-cell>
        </div>
        <div class="logout">
            <van-button @click="login()" type="default" block>{{userInfo.loginText}}</van-button>
        </div>
    </div>
  </div>
</template>

<script>

    import {createNamespacedHelpers} from 'vuex'

    const {mapState} = createNamespacedHelpers('mineModule');

    export default {
        name: "mine",

        computed: {
            ...mapState(['userInfo'])
        },

        methods: {

            // 退出或登录
            login() {
                let userStatus = localStorage.getItem('user');

                if(userStatus) {
                    let userInfo = JSON.parse(userStatus);

                    if(userInfo.isLogin) {
                        localStorage.removeItem('user');

                        this.$store.commit('mineModule/changeUserInfo', {
                            loginText: '登录',
                            username: ''
                        });
                    }else {
                        this.$router.push({name: 'login'});
                    }
                }else {
                    this.$router.push({name: 'login'});
                }
            },

            // 查看收藏的电影
            viewCollectMovie() {
                // 验证是否登录
                let userStatus = localStorage.getItem('user');

                if(userStatus) {
                    let userInfo = JSON.parse(userStatus);

                    // 如果登录
                    if(userInfo.isLogin) {
                        this.$router.push({name: 'collectMovie'});
                    }else {
                        // 如果未登录
                        this.$toast('请先登录');
                    }
                }else {
                    // 未登录
                    this.$toast('请先登录');
                }
            }
        },

        created() {
            // console.log("mine created");

            // 获取用户信息
            let userStatus = localStorage.getItem('user');

            if(userStatus) {
                let user = JSON.parse(userStatus);

                if(user.isLogin) {
                    this.$store.commit('mineModule/changeUserInfo', {
                        loginText: '安全退出',
                        username: user.username
                    });
                }
            }

        }
    };
</script>

<style lang="less" scoped>
    .mine {
        .app-logo {
            height: 200px;
            position: relative;
            background: url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=169103091,4272715110&fm=15&gp=0.jpg) no-repeat center center;
            background-size: cover;
            .head-sculpture{
                position: absolute;
                bottom: 20px;
                left: 25px;
            }
            .logo {
                background: #fff url(../../assets/image/03.jpg) no-repeat center center;
                background-size: contain;
                width: 2.13rem;
                height: 2.13rem;
                border-radius: 50%;
                box-shadow: 0 0 0 5px rgba(145, 145, 145, 0.3);
            }
        }
        .list{
            margin: 10px 0;
        }
        .username{
            margin-left: 15px;
            font-size: 22px;
            color: #FF5757;
            margin-top: 45px;
        }
    }
</style>