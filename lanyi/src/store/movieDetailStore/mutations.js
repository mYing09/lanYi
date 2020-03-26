export const mutations = {
    getMovieDetailData(state,data) {
        state.movieDetailData = data;
        // console.log('state.movieDetailData ==> ',state.movieDetailData);
    },

    changeW(state,w) {
        state.movieDetailData.w = w;
    },
    
    changeMr(state,mr) {
        state.movieDetailData.mr = mr;
    },

    // 修改行数
    changeDisplay(state) {
        state.display = state.display == 'block' ? '-webkit-box' : 'block';
        // console.log(state.display)
    },

    // 重置state
    resetState(state) {
        state.movieDetailData = {
            images: {},
            durations: [],
            rating: {},
            casts: []
        };

        state.collectActive = false;
    },

    changecollectActive(state,isActive) {
        state.collectActive = isActive;
    }
}