import {state} from './state'
import {mutations} from './mutations'
import {actions} from './actions'

export const buyTicketModule = {
    namespaced: true,
    state,
    mutations,
    actions
}