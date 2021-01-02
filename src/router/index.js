import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
//import Vuebar from "vuebar";

Vue.use(VueRouter);
//Vue.use(Vuebar);

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/auth/register",
        name: "register",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "register" */ "../views/auth/Register.vue")
    },
    {
        path: "/auth/login",
        name: "login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "register" */ "../views/auth/Login.vue")
    },
    {
        path: "/recipes/new",
        name: "add-recipe",
        component: () =>
            import (
                /* webpackChunkName: "add-recipe" */
                "../views/recipes/NewRecipe.vue"
            ),
        // meta: {
        //     title: "Add Your Recipe - Tasties",
        //     metaTags: [{
        //             name: "description",
        //             content: "The add new recipe page of Tasties"
        //         },
        //         {
        //             property: "og:description",
        //             content: "The add new recipe page of Tasties"
        //         }
        //     ]
        // }
    },
    {
        path: "/recipes",
        name: "recipe-list",
        component: () =>
            import (
                "../views/recipes/RecipeList.vue"
            ),
       
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;