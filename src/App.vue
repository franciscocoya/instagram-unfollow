<script setup>
import BaseTextArea from './components/BaseTextArea.vue'

import {getUnfollowers} from './lib/main.js'

import userFollowers1 from './data/followers_1.json'
import userFollowers2 from './data/followers_2.json'
import usersFollowing from './data/following.json'

// const followers_names = userFollowers.map((follower) => follower.string_list_data[0].value)
// const following_names = usersFollowing.relationships_following.map(
//   (following) => following.string_list_data[0].value
// )

const unfollowers = getUnfollowers(usersFollowing, userFollowers1, userFollowers2)

// const unfollowers = following_names.filter((following) => !followers_names.includes(following))


</script>

<template>
  <main>
    <!-- textarea for followers -->
    <!-- textarea for following accounts -->
    <BaseTextArea />
    <br />

    <ul>
      <li v-for="(unfollower, index) in unfollowers" v-bind:key="index">
        {{ unfollower }}
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
