export const mutations = {

    changeMovieData(state,result) {

        if(state.isInit) {
            state.isInit = false;
        }

        if(state.isInitial) {
            state.isInitial = false;
        }

        if(result.data.subjects.length < 10) {
            state.isHas = false;
        }
        
        state.movieData.data.subjects.push(...result.data.subjects);

        state.params.start += state.params.count;

        // console.log('state.movieData ==> ',state.movieData);
    },

    changeData(state,msg) {

        if(state.isInit) {
            state.isInit = false;
        }

        if(state.isInitial) {
            state.isInitial = false;
        }

        if(msg.data.subjects.length < 10) {
            state.isHas = false;
        }
        
        state.soonData.data.subjects.push(...msg.data.subjects);

        state.params.start += state.params.count;

        // console.log('state.soonData ==> ',state.soonData);
    },

    changeMovieBox(state,o) {
        state.movieBoxData.movieBox = o.movieBox;
        state.movieBoxData.movieBoxHeight = o.movieBoxHeight;
    },

    // 修改定位城市
    changeLocationCity(state,city) {
        state.params.city = city;

       // console.log('state.params.city ==> ',state.params.city);
    }

}