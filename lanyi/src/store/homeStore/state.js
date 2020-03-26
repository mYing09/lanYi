export const state = {

    baseUrl: 'https://douban.uieee.com/v2/movie',

    // 新片榜数据
    newMovieData: [],

    // 欧美榜数据
    westMovieData: [],

    // 展示欧美榜数据
    showWestMovieData: {
        start: 0,
        end: 6,
        data: []
    },

    // 是否存在换一换数据
    isHasData: true,

    // 是否初始化
    isInit: true,

}