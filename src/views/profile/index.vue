<template>
  <div class="profile-page" :class="{ 'profile-page--loading': isLoading }">
    <spinner v-if="isLoading" message="Loading Profile" :size="50" />
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <p v-if="!userById">
        Oops! Something went wrong
      </p>
      <template v-else>
        <div class="profile-page-content">
          <v-card class="mx-auto profile-user-items">
            <section class="section section--general-info">
              <div class="profile-info">
                <img
                  :src="
                    userById.avatar || require('@/assets/images/user.png')
                  "
                  :alt="userById.full_name"
                  class="profile-image"
                />
                <h3 class="profile-name">
                  <span>{{ userById.full_name }}</span>
                  <span
                    class="edit-icon"
                    v-if="currentUser && userById.id === currentUser.id"
                    @click.stop="openDialog"
                    ><i
                      class="far fa-edit user-edit"
                      aria-label="Edit user profile"
                    ></i
                  ></span>
                  <v-dialog v-model="dialog" max-width="440">
                    <edit-profile-form
                      :current-user="userById"
                      :close-dialog="closeDialog"
                    />
                  </v-dialog>
                  <v-tooltip
                    right
                    v-if="currentUser && userById.id !== currentUser.id"
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon
                        color="#04b4d4"
                        class="follow-icon"
                        v-on="on"
                        @click="followUser"
                        >{{
                          isFollowing
                            ? "mdi-account-check-outline"
                            : "mdi-account-plus-outline"
                        }}</v-icon
                      >
                    </template>
                    <span>{{
                      isFollowing
                        ? `Unfollow ${userById.full_name}`
                        : `Follow ${userById.full_name}`
                    }}</span>
                  </v-tooltip>
                </h3>
              </div>
            </section>
            <section class="section section--followers">
              <follower-list
                :is-current-user="
                  currentUser ? userById.id === currentUser.id : false
                "
                :profile-fullname="userById.full_name"
                :follower-list="[]"
                follower-type="following"
              />
              <follower-list
                :is-current-user="
                  currentUser ? userById.id === currentUser.id : false
                "
                :profile-fullname="userById.full_name"
                :follower-list="[]"
                follower-type="followerBy"
              />
            </section>
            <section class="section section--recipes">
              <profile-recipe-list
                :is-current-user="
                  currentUser ? userById.id === currentUser.id : false
                "
                :profile-fullname="userById.full_name"
                :recipe-list="userById.recipes"
                recipe-list-type="Uploaded"
              />
              <profile-recipe-list
                :is-current-user="
                  currentUser ? userById.id === currentUser.id : false
                "
                :profile-fullname="userById.full_name"
                :recipe-list="[]"
                recipe-list-type="Favorited"
              />
              <profile-recipe-list
                :is-current-user="
                  currentUser ? userById.id === currentUser.id : false
                "
                :profile-fullname="userById.full_name"
                :recipe-list="[]"
                recipe-list-type="Saved"
              />
            </section>
          </v-card>
          <account-actions />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import Spinner from "@/components/shared/Spinner";
import AccountActions from "@/components/profile/AccountActions";
import FollowerList from "@/components/profile/FollowerList";
import ProfileRecipeList from "@/components/profile/RecipeList";
import EditProfileForm from "@/components/forms/profile/Edit";
export default {
  name: "profile-page",
  components: {
    Spinner,
    FollowerList,
    ProfileRecipeList,
    AccountActions,
    EditProfileForm
  },
  data() {
    return {
      userId: this.$route.params.userId,
      userById: null,
      profileImage: null,
      dialog: false,
      isFollowing: false,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    // ...mapGetters({
    //   userById: "users/userById",
    //   isAuthenticated: "auth/isAuthenticated",
    //   currentUser: "users/currentUser"
    // }),
    linkToEdit() {
      return `${this.$route.fullPath}/edit`;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    currentUser() {
      return this.$store.getters.getUser;
    }
  },
  watch: {
    async "$route.params.userId"(id) {
      this.userId = id;
      this.isLoading = true;
      try {
        await axios.get("http://localhost:3000/api/v1/users/" + this.userId)
        .then(response => {
          this.error = null;
          this.isLoading = false;
          this.userById = response.data;
          if (response.data.avatar) this.userById.avatar = 'http://localhost:3000' + response.data.avatar;
        });
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  },
  methods: {
    // ...mapActions({
    //   getUserById: "users/getUserById",
    //   followUserProfile: "users/followUserProfile"
    // }),
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    followUser() {
      if (this.isAuthenticated && this.currentUser) {
        const currentUserId = this.currentUser.id;
        const currentProfile = this.userById;
        let updatedFollowedByList;
        let updatedFollowingList;
        if (this.isFollowing) {
          this.isFollowing = !this.isFollowing;
          updatedFollowedByList = currentProfile.followedBy.filter(
            userId => userId !== currentUserId
          );
          updatedFollowingList = this.currentUser.following.filter(
            userId => userId !== currentProfile.id
          );
        } else {
          this.isFollowing = !this.isFollowing;
          updatedFollowedByList = [...currentProfile.followedBy, currentUserId];
          updatedFollowingList = [...this.currentUser.following, this.userId];
        }
        this.followUserProfile({
          userId: this.userId,
          currentUserId,
          following: updatedFollowingList,
          followedBy: updatedFollowedByList
        });
      }
    }
  },
  async created() {
    this.isLoading = true;
    try {
      await axios.get("http://localhost:3000/api/v1/users/" + this.userId)
      .then(response => {
        this.error = null;
        this.isLoading = false;
        this.userById = response.data;
        if (response.data.avatar) this.userById.avatar = 'http://localhost:3000' + response.data.avatar;
      });
    } catch (error) {
      this.error = error;
      this.isLoading = false;
    }
    // if (this.currentUser && this.userById) {
    //   this.isFollowing = this.userById.followedBy.includes(this.currentUser.id);
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";
.profile {
  &-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.5rem;
    min-height: 56vh;
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
    &-content {
      width: 100%;
      @include smallDevices {
        width: 30rem;
      }
      @include mediumDevices {
        width: 50rem;
      }
    }
  }
  &-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  &-name {
    color: #333333;
    text-transform: uppercase;
    font-size: 1.25rem;
    letter-spacing: 3px;
    display: flex;
    align-items: center;
    @include mediumDevices {
      font-size: 1.5rem;
    }
  }
  &-image {
    height: 5rem;
    width: 5rem;
    border-radius: 5rem;
    margin-right: 1rem;
    @include mediumDevices {
      height: 7.5rem;
      width: 7.5rem;
    }
  }
  &-user-items {
    margin-bottom: 2rem;
  }
}
.edit-icon,
.follow-icon {
  margin-top: -0.125rem;
  margin-left: 0.5rem;
}
.edit-icon {
  color: $app-main-color;
  font-size: 1.25rem;
  cursor: pointer;
}
.dialog {
  width: 27.5rem;
}
.section {
  padding: 2rem 2rem 0;
  &--general-info {
    background-color: lighten($app-main-color, 50%);
    padding-bottom: 2rem;
  }
  &--recipes {
    padding-bottom: 1rem;
  }
}
</style>