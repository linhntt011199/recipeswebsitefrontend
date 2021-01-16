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

    {
        path: "/recipes/:recipeType",
        name: "recipe-type",
        component: () =>
            import (
                "../views/recipes/RecipeType.vue"
            ),
        // meta: {
        //   title: "Recipe Type - Tasties",
        //   metaTags: [
        //     {
        //       name: "description",
        //       content: "The recipe type page of Tasties"
        //     },
        //     {
        //       property: "og:description",
        //       content: "The recipe type page of Tasties"
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
          title: "Edit Recipe - Tasties",
          metaTags: [
            {
              name: "description",
              content: "The edit recipe page of Tasties"
            },
            {
              property: "og:description",
              content: "The edit recipe page of Tasties"
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
          title: "Profile - Tasties",
          metaTags: [
            {
              name: "description",
              content: "The user profile page of Tasties"
            },
            {
              property: "og:description",
              content: "The user profile page of Tasties"
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
      //     title: "Recipe Detail - Tasties",
      //     metaTags: [
      //       {
      //         name: "description",
      //         content: "The recipe detail page of Tasties"
      //       },
      //       {
      //         property: "og:description",
      //         content: "The recipe detail page of Tasties"
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