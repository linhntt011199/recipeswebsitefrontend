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
        //     title: "Add Your Recipe",
        //     metaTags: [{
        //             name: "description",
        //             content: "The add new recipe page"
        //         },
        //         {
        //             property: "og:description",
        //             content: "The add new recipe page"
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

    {
        path: "/recipes/:recipeType",
        name: "recipe-type",
        component: () =>
            import (
                "../views/recipes/RecipeType.vue"
            ),
        // meta: {
        //   title: "Recipe Type",
        //   metaTags: [
        //     {
        //       name: "description",
        //       content: "The recipe type page"
        //     },
        //     {
        //       property: "og:description",
        //       content: "The recipe type page"
        //     }
        //   ]
        // }
    },

    {
        path: "/recipes/:recipeType/:recipeId/edit",
        name: "edit-recipe",
        component: () =>
          import(/* webpackChunkName: "edit-recipe" */ "../views/recipes/Edit.vue"),
        meta: {
          title: "Edit Recipe",
          metaTags: [
            {
              name: "description",
              content: "The edit recipe page"
            },
            {
              property: "og:description",
              content: "The edit recipe page"
            }
          ]
        }
    },
    {
        path: "/profile/:userId",
        name: "profile",
        props: true,
        component: () =>
          import(/* webpackChunkName: "profile" */ "../views/profile"),
        meta: {
          title: "Profile",
          metaTags: [
            {
              name: "description",
              content: "The user profile page"
            },
            {
              property: "og:description",
              content: "The user profile page"
            }
          ]
        }
      },
      {
        path: "/recipes/:recipeType/:recipeId",
        name: "recipe-detail",
        props: true,
        component: () =>
          import(
            "../views/recipes/Detail.vue"
          ),
      //   meta: {
      //     title: "Recipe Detail",
      //     metaTags: [
      //       {
      //         name: "description",
      //         content: "The recipe detail page"
      //       },
      //       {
      //         property: "og:description",
      //         content: "The recipe detail page"
      //       }
      //     ]
      // }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;