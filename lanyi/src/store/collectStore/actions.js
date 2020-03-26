export const actions = {
    // 删除收藏的电影
    deleteCollect(context, index) {
        context.commit('deleteCollect', index)
    }
}