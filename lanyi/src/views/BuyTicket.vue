<template>
    <div class="buy-ticket">
        <div class="detail-header">
            <van-nav-bar
                title="购票选座"
                left-text="返回"
                left-arrow
                @click-left="back()"
            />
        </div>
        <div class="ticket-cont">
            <div class="movie-about">
                <div class="movie-name">{{data.title}}</div>
                <div class="movie-time">今天{{month}}月{{date}}日 21:00-23:00 6号观影大厅</div>
                <div class="seat-box">
                    <ul class="seat clearfix" :style="{width: width + 'px'}">
                        <li ref="userchair" v-for="(item,index) in userChairData" :key="index">{{item.row}}排{{item.col}}座</li>
                    </ul>
                </div>
            </div>
            <div class="chair-flag">
                <div>
                    <div class="c-box clearfix">
                        <div class="chair-icon c-bg1 fl"></div>
                        <div class="fl c-words">可选</div>
                    </div>
                </div>
                <div>
                    <div class="c-box clearfix">
                        <div class="chair-icon c-bg2 fl"></div>
                        <div class="fl c-words">已选</div>
                    </div>
                </div>
                <div>
                    <div class="c-box clearfix">
                        <div class="chair-icon c-bg3 fl"></div>
                        <div class="fl c-words">已售</div>
                    </div>
                </div>
            </div>
            <div class="screen">
                <div class="screen-arc"></div>
            </div>
            <div class="chair-box">
                <div class="chair" :class="index == 0 ? 'chair1' : index == 6 ? 'chair3' : 'chair2'" v-for="(item,index) in chairDatas" :key="index">
                    <span v-for="(value,key) in item" :key="key" :class="{s3: index > 0 && index < 6 && key == 2, s8: index > 0 && index < 6 && key == 7, buying: value.type == 'buying', selected: value.type == 'selected'}" @click="selectChair(value)"></span>
                </div>
            </div>
        </div>
        <div class="bottom-sidebar clearfix">
            <div class="fl total">合计：￥<span>0.00</span></div>
            <div class="fr pay">确认支付</div>
        </div>
    </div>
</template>

<script>

    import {createNamespacedHelpers} from 'vuex';

    const {mapState,mapMutations} = createNamespacedHelpers('buyTicketModule');

    export default {
        name: 'buyTicket',

        computed: {
            ...mapState(['data','month','date','chairDatas','userChairData','width'])
        },

        methods: {

            ...mapMutations(['resetData']),

            // 选择座位
            selectChair(item) {
                // 不能选择已购买的
                if(item.type == 'buying') {
                    return;
                }

                // 没有选择的，高亮显示座位
                if(item.type == '') {
                    item.type = 'selected';

                    // 提交mutations
                    this.$store.commit('buyTicketModule/changeChairData',item);

                    // 提交actions
                    this.$store.dispatch('buyTicketModule/addUserChairData',item)
                        .then(() => {
                            let firstLi = this.$refs.userchair[0];
                            let width = firstLi.offsetWidth;
                            let marginRight = parseFloat(getComputedStyle(firstLi).marginRight);
                            this.$store.commit('buyTicketModule/modifyUlWidth',(width + marginRight) * this.userChairData.length);
                        })
                }else if(item.type == 'selected') {

                    // console.log('已选，取消选择');
                    item.type = '';
                    this.$store.commit('buyTicketModule/changeChairData',item);

                    this.$store.dispatch('buyTicketModule/deleteUserChairData',item)
                        .then(() => {
                            let firstLi = this.$refs.userchair[0];

                            if(!firstLi) {
                                this.$store.commit('buyTicketModule/modifyUlWidth',0);
                                return;
                            }

                            let width = firstLi.offsetWidth;
                            let marginRight = parseFloat(getComputedStyle(firstLi).marginRight);
                            this.$store.commit('buyTicketModule/modifyUlWidth',(width + marginRight) * this.userChairData.length);
                        })
                }
                
            },

            // 返回上一步
            back() {
                this.$router.go(-1);
            },
        },

        created() {

            // 重置data
            this.resetData();

            this.$toast.loading({
                duration: 0,
                message: '加载中...'
            });

            // 截取查新参数
            let queryId = this.$route.query.id;

            // 请求
            this.axios({
                method: 'GET',
                url: 'https://douban.uieee.com/v2/movie/subject/' + queryId
            }).then(result => {

                // console.log('result ==> ',result);

                this.$store.commit('buyTicketModule/getData', result.data)

                this.$toast.clear();

            }).catch(err => {

                // console.log('err ==> ',err);
                this.$toast.clear();
            })

        },
    }
</script>

<style lang="less" scoped>
    .buy-ticket{
        .detail-header{
            position: sticky;
            top: 0;
            left: 0;
            z-index: 19;
        }
        .ticket-cont{
            background: #fff;
            background-image: linear-gradient(to top,#fff,#FFE5D4);
            min-height: 540px;
            margin: 0 auto;
            overflow-y: auto;
            padding-top: 20px;
        }
        .bottom-sidebar{
            position: sticky;
            bottom: 0;
            left: 0;
            height: 60px;
            width: calc(~"100% - 30px");
            background: #fff;
            box-shadow: 0 0 5px 1px #ddd;
            padding: 0 15px;
        }
        .movie-about{
            box-shadow: 0 0 10px #F47378;
            padding: 15px;
            margin: 0 15px 40px;
            border-radius: 10px;
        }
        .movie-name{
            font-size: 18px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #3F48CC;
            font-weight: bold;
        }
        .movie-time{
            margin: 10px 0 20px;
            font-size: 14px;
            color: #666;
        }
        .seat-box{
            overflow-x: auto;
            overflow-y: hidden;
            height: 36px;
        }
        .seat{
            height: 36px;
            >li{
                width: 70px;
                height: 34px;
                border: 1px solid #FFA213;
                text-align: center;
                line-height: 34px;
                color: #A349A4;
                font-size: 15px;
                float: left;
                margin-right: 10px;
                position: relative;
                overflow: hidden;
                border-radius: 17px;
                &:last-child{
                    margin-right: 0;
                }
            }
        }
        .chair-flag{
            display: flex;
            >div{
                flex: 1;
            }
        }
        .c-box{
            width: 62px;
            margin: 0 auto;
        }
        .c-words{
            font-size: 14px;
            margin-left: 10px;
            line-height: 24px;
        }
        .chair-icon{
            width: 24px;
            height: 24px;
        }
        .c-bg1{
            background: #6BD089;
        }
        .c-bg2{
            background: #F47378;
        }
        .c-bg3{
            background: #BFBFBF;
        }
        .screen{
            width: 300px;
            height: 70px;
            margin: 30px auto 0;
            position: relative;
            overflow: hidden;
        }
        .screen-arc{
            width: 500px;
            height: 200px;
            border-radius: 50%;
            border: 2px solid #FFC000;
            box-shadow: 0 1px 5px #FFC000 inset;
            position: absolute;
            top: 0;
            left: -100px;
        }
        .chair-box{
            padding: 0 10px;
        }
        .chair{
            margin: 0 auto 8px;
            &.chair1{
                width: 96px;
                height: 24px;
            }
            &.chair2{
                width: 352px;
                height: 24px;
                >span{
                    &.s3,&.s8{
                        margin-left: 36px;
                    }
                }
            }
            &.chair3{
                width: 160px;
            }
            >span{
                float: left;
                width: 24px;
                height: 24px;
                background: #6BD089;
                margin: 0 4px;
                &.buying{
                    background: #BFBFBF;
                }
                &.selected{
                    background: #F47378;
                }
            }
        }
        .total{
            font-size: 18px;
            line-height: 60px;
            color: #666;
            >span{
                font-size: 20px;
                color: #333;
            }
        }
        .pay{
            width: 150px;
            height: 40px;
            font-size: 18px;
            margin-top: 10px;
            border-radius: 20px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            border: 1px solid #FFA213;
            background-image: linear-gradient(to bottom,#FCAE61,#FC9731);
            &:active{
                background-image: linear-gradient(to top,#FCAE61,#FC9731);
            }
        }
    }
</style>