import { defineStore } from 'pinia'

const useFollowerStore = defineStore({
  id: 'followerStore',
  state: () => ({
    followers: [],
    following: [],
    unfollowers: []
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
    }
  }
})

export { useFollowerStore }
