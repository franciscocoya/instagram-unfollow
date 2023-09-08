import { defineStore } from 'pinia'

const useFollowerStore = defineStore({
  id: 'followerStore',
  state: () => ({
    followers: [],
    following: [],
    unfollowers: [],
    unfollowersFiltered: []
  }),

  actions: {
    setFollowers(followers) {
      this.followers = followers
    },
    setFollowing(following) {
      this.following = following
    },
    setUnfollowers(unfollowers) {
      this.unfollowers = unfollowers
    },
    filterUnfollowersByUsername(username) {
      this.unfollowersFiltered = this.unfollowers.filter((unfollower) => {
        return unfollower.value.includes(username)
      })
    }
  }
})

export { useFollowerStore }
