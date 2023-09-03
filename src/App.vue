<script setup>
import playwright from 'playwright'
import BaseTextArea from './components/BaseTextArea.vue'

import userFollowers from './data/followers_1.json'
import usersFollowing from './data/following.json'

const followers_names = userFollowers.map((follower) => follower.string_list_data[0].value)
const following_names = usersFollowing.relationships_following.map(
  (following) => following.string_list_data[0].value
)

const unfollowers = following_names.filter((following) => !followers_names.includes(following))

const getUserProfileImage = async () => {
  const browser = await playwright.chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()
  page.goto('https://www.instagram.com/fincafiyuelo/')

  // Get use profile image from their instagram account
  const [img] = await page.$x(
    '/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header/div/div/span/img'
  )
  console.log(img)
}

getUserProfileImage();

</script>

<template>
  <main>
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
