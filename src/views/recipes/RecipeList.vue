<template>
    <div
    class="recipe-list-page"
    :class="{ 'recipe-list-page--loading': isLoading }"
    >
        <spinner v-if="isLoading" message="Loading Recipes" :size="50"/>
        <p v-else-if="error">{{ error }}</p>
        <div v-else>
            <p v-if="recipeList.length === 0" class="empty-recipe-list">
                Oops! Something went wrong
            </p>
            <div v-else class="recipe-list-content">
                <breadcrumbs :breadcrumb-links="breadcrumbLinks" />
                <div v-if="recipeList.length === 0" class="empty-recipe-list">
                    There are currently no recipes in the database
                </div>
                <section v-else class="recipe-list-grid">
                    <sort-recipe-list @sortRecipeListBy="sortRecipeList" />
                    <recipe-list class="recipe-list" :recipe-list="sortedRecipeList" />
                    <br />
                    <!-- <infinite-loading @infinite="loadMoreRecipes"> -->
                        <spinner slot="spinner" message="Loading More Recipes" :size="35" />
                    <!-- </infinite-loading> -->
                </section>
            </div>
        </div>
    </div>
</template>

<script>
//import { mapGetters, mapActions } from "vuex";
import { sortMethods} from "../../helpers";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Spinner from "@/components/shared/Spinner";
import SortRecipeList from "@/components/recipes/list/SortRecipeList";
import RecipeList from "@/components/recipes/shared/RecipeList";
import axios from "axios";
export default {
    name: "recipe-list-page",
    components:{
        Breadcrumbs,
        Spinner,
        SortRecipeList,
        RecipeList
    },
    data() {
        return {
            breadcrumbLinks: [
                {
                    name: "Recipes",
                    path: ""
                }
            ],
            sortBy: "newest",
            isLoading: false,
            error: null,
            recipeList: [],
            recipeListTotalSize: 0,
        };
    },
    computed: {
        // ...mapGetters({recipeList: "recipes/recipeList"}),
        sortedRecipeList() {
            let sortedList;
            switch (this.sortBy) {
                case "newest":
                    sortedList = [...this.recipeList].sort(sortMethods.byNewest);
                    break;
                case "oldest":
                    sortedList = [...this.recipeList].sort(sortMethods.byOldest);
                    break;
                case "highest-rated":
                    sortedList = [...this.recipeList].sort(sortMethods.byRating);
                    break;
                case "most-viewed":
                    sortedList = [...this.recipeList].sort(sortMethods.byViews);
                    break;
                // case "most-commented":
                //     sortedList = [...this.recipeList].sort(sortMethods.byComments);
                //     break;
                default:
                    sortedList = this.recipeList;
            }
            // console.log(sortedList);
            return sortedList;
        }
    },
    methods: {
        // ...mapActions({ getAllRecipes: "recipes/getAllRecipes" }),
        sortRecipeList(sortBy) {
            this.sortBy = sortBy;
        },
    },

    // async loadMoreRecipes($state) {
    //     if (this.recipeListTotalSize === this.recipeList.length) {
    //         $state.complete();
    //     }

    //     this.isLoadingMore = true;

    //     try {
    //         await this.recipeListTotalSize++;

    //         $state.loaded();
    //         this.error = null;
    //         this.isLoadingMore = false;
    //     } catch (error) {
    //         this.error = error;
    //         this.isLoadingMore = false;
    //     }
    // },

    async created() {
        if (this.recipeList.length === 0) {
        this.isLoading = true;
        try {
            await axios.get("http://localhost:3000/api/v1/recipes", {
            headers: { Authorization: this.$store.getters.getToken }
            })
            .then(response => {
                this.recipeList = response.data;
                this.recipeListTotalSize = this.recipeList.length;
            })
            // {
            //   this.$store.commit('setToken', response.data.auth_token);
            //   this.$store.commit('setRecipeList', response.data.recipeList);
            // })
            .catch(e => e);
            this.isLoading = false;
        } catch (error) {
            this.error = error;
            this.isLoading = false;
        }
        }
    },
    // beforeDestroy() {
    //     this.$eventBus.$off("sort-recipe-list");
    // }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";
.recipe-list {
    &-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0.5rem;
        min-height: 50vh;
        &--loading {
            justify-content: center;
            align-items: center;
        }
        &--loading {
            justify-content: center;
            align-items: center;
        }
        @include mediumDevices {
            margin: 2rem 3.5rem;
            padding-top: 1rem;
        }
        @include largeDevices {
            margin: 2rem 8.5rem;
        }
    }
    &-grid {
        padding: 1rem;
        @include mediumDevices {
            padding: 0;
        }
    }
}
</style>