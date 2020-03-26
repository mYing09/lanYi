import routesComponent from './routesComponent'

export default [
    {
        // 注册
        path: '/register',
        name: 'register',
        component: routesComponent.registerComponent
    },

    {
        // 登录
        path: '/login',
        name: 'login',
        component: routesComponent.loginComponent
    },

    {
        // index
        path: '/index',
        name: 'index',
        component: routesComponent.indexComponent,
        children: [
            {
                path: '/home',
                name: 'home',
                component: routesComponent.homeComponent
            },
            {
                path: '/film',
                name: 'film',
                component: routesComponent.filmComponent,
                // children: [
                //     {
                //         path: '/movie',
                //         name: 'movie',
                //         component: routesComponent.movieComponent,
                //     },
                //     {
                //         path: '/coming',
                //         name: 'coming',
                //         component: routesComponent.comingComponent,
                //     }
                // ]
            },
            {
                path: '/mine',
                name: 'mine',
                component: routesComponent.mineComponent
            },
        ]
    },
    
    {
        path: '/movieDetail/:id',
        name: 'movieDetail',
        component: routesComponent.movieDetailComponent
    },

    {
        path: '/collectMovie',
        name: 'collectMovie',
        component: routesComponent.collectMovieComponent
    },

    {
        path: '/buyTicket',
        name: 'buyTicket',
        component: routesComponent.buyTicketComponent
    },


    {
        path: '*',
        redirect: {name: 'register'}
    }
]