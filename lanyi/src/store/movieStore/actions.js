export const actions = {
    changeMovieData(context, result) {
        context.commit('changeMovieData', result);
    },
    
    changeData(context, msg) {
        context.commit('changeData', msg);
    }
}