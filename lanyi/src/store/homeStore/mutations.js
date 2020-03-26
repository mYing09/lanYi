export const mutations = {

    // 获取新片榜数据
    getNewMovieData(state,result) {
        state.newMovieData = result.concat();
    },

    // newMovieData添加width属性
    modifyNewMovieData(state,width) {

        // 根据星级平均分设置宽度
        state.newMovieData.forEach(v => {
            v.width = v.rating.average * width / v.rating.max;
        });
    },

    // 获取欧美榜数据
    getWestMovieData(state,results) {
        // 判断是否第一次请求数据
        if(state.isInit) {
            state.isInit = false;
        }

        state.westMovieData = results.concat();
        // console.log('state.westMovieData ==> ',state.westMovieData)

        // 截取数据
        state.showWestMovieData.data = state.westMovieData.slice(state.showWestMovieData.start,state.showWestMovieData.end);
        // console.log('state.showWestMovieData.data ==> ',state.showWestMovieData.data);
        
        state.showWestMovieData.start = state.showWestMovieData.end;
        state.showWestMovieData.end += 6;
    },

    // 换一换
    toggleWestMovie(state) {

        let data = state.westMovieData.slice(state.showWestMovieData.start,state.showWestMovieData.end);
    
        // 如果不足6条
        let count = data.length;

        if(count == 0) {

            state.isHasData = false;

        }else if(count < 6) {
            state.showWestMovieData.data.splice(0,count);
            state.showWestMovieData.data.push(...data);
            state.isHasData = false;
        }else{
            state.showWestMovieData.data = data;
        }
    }
}