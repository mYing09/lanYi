export const state = {

    
    params: {

        // 开始截取位置
        start: 0,

        // 结束截取位置
        count: 10,

        // 城市
        city: '北京',

    },

    movieData: {
        data: {
            subjects: []
        }
    },

    soonData: {
        data: {
            subjects: []
        }
    },

    // 是否初始化数据
    isInit: true,

    // 是否存在可加载数据
    isHas: true,

    // 控制返回当前路由不请求数据
    isInitial: true,

    movieBoxData: {
        movieBox: null,
        movieBoxHeight: 0,
        timers: []
    }

}