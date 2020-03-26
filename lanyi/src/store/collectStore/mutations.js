export const mutations = {
    // 获取收藏的电影
    getCurrentCollectData(state, data) {
        state.currentCollectData = data;
        // console.log(data)
    },

    // 删除收藏的电影
    deleteCollect(state, index) {
        state.currentCollectData.splice(index, 1)
    }

}