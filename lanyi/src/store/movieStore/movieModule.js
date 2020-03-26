import {state} from './state'
import {mutations} from './mutations'
import {actions} from './actions'

export const movieModule = {
    namespaced: true,
    state,
    mutations,
    actions
}