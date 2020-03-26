class RoutesComponent{

    registerComponent() {
        return import('../views/Register.vue')
    }

    loginComponent() {
        return import('../views/Login.vue')
    }

    indexComponent() {
        return import('../views/Index.vue')
    }

    homeComponent() {
        return import('../views/indexComponent/Home.vue')
    }

    filmComponent() {
        return import('../views/indexComponent/Film.vue')
    }

    mineComponent() {
        return import('../views/indexComponent/Mine.vue')
    }

    // movieComponent() {
    //     return import('../views/filmComponent/Movie.vue')
    // }

    // comingComponent() {
    //     return import('../views/filmComponent/Coming.vue')
    // }

    movieDetailComponent() {
        return import('../views/MovieDetail.vue')
    }

    collectMovieComponent() {
        return import('../views/CollectMovie.vue')
    }

    buyTicketComponent() {
        return import('../views/BuyTicket.vue')
    }

}

export default new RoutesComponent();