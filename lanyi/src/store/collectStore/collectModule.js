import {state} from './state'
import {mutations} from './mutations'
import {actions} from './actions'

export const collectModule = {
    namespaced: true,
    state,
    mutations,
    actions
}