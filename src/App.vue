<script setup>
import cheerio from 'cheerio'
import { ref } from 'vue'
import BaseTextArea from './components/BaseTextArea.vue'
import { readJsonFile, readMultipleJsonFiles } from './lib/util.js'
import { useFollowerStore } from './stores/followerStore.js'

import { mergeMultipleArrays } from './lib/main.js'

const followerStore = useFollowerStore()

let unfollowers = ref([])

const handleUploadFollowers = (event) => {
  Promise.all(readMultipleJsonFiles(event)).then((followers) => {
    const followersMerged = mergeMultipleArrays(...followers)
    followerStore.setFollowers(
      followersMerged.map((follower) => follower.string_list_data[0].value)
    )
  })
}

const handleUploadFollowing = (event) => {
  readJsonFile(event, event.target.files[0]).then((followings) => {
    followerStore.setFollowing(
      followings.relationships_following.map((following) => following.string_list_data[0].value)
    )
  })
}

const showUnfollowers = () => {
  unfollowers.value = followerStore.following.filter(
    (follower) => !followerStore.followers.includes(follower)
  )
}
</script>

<template>
  <main class="flex flex-col justify-between gap-16">
    <!-- textarea for followers -->
    <!-- textarea for following accounts -->

    <div class="flex flex-col gap-5">
      <h1 class="text-4xl font-bold tracking-tight text-center text-white sm:text-6xl pt-10">
        Check Instagram Unfollowers
      </h1>
      <h2 class="text-2xl text-center">
        Tool to check who is not following you back on Instagram. <br><span class="text-xl text-pink-300">This website does not store any data</span>.
      </h2>
    </div>
    <div class="grid grid-cols-2 gap-20 px-40">
      <section class="flex flex-col gap-5">
        <!-- File upload section -->

        <div class="flex flex-col flex-wrap gap-10">
          <div class="flex flex-col gap-3">
            <h2 class="text-2xl font-semibold text-pink-200">Followers</h2>
            <BaseTextArea
              :onchange="handleUploadFollowers"
              :multiple="true"
              :counter="followerStore.followers.length"
              counter-label="followers"
            />
          </div>

          <div class="flex flex-col gap-3">
            <h2 class="text-2xl font-semibold text-pink-200">Following</h2>
            <BaseTextArea
              :onchange="handleUploadFollowing"
              :counter="followerStore.following.length"
              counter-label="following"
            />
          </div>
        </div>

        <button
          v-if="unfollowers.length === 0"
          @click.prevent="showUnfollowers"
          type="button"
          class="bg-pink-500 text-neutral-200 text-base font-semibold px-3 py-2 rounded-md hover:bg-pink-600 transition-colors duration-300"
        >
          Show unfollowers
        </button>
      </section>

      <section class="h-96 overflow-y-visible overflow-x-hidden">
        <ul v-if="unfollowers.length > 0" role="list">
          <li
            v-for="(unfollower, index) in unfollowers"
            :key="index"
            class="flex justify-between gap-x-6 py-5"
          >
            <div class="flex min-w-0 gap-x-4">
              <img
                class="h-12 w-12 flex-none rounded-full bg-gray-50"
                :src="'https://randomuser.me/api/portraits/men/66.jpg'"
                alt=""
              />
              <div class="min-w-0 flex flex-col gap-2">
                <p class="text-sm font-light leading-6 text-pink-100">{{ unfollower }}</p>
                <button
                  @click.prevent=""
                  class="bg-gray-50 text-gray-800 text-center font-semibold text-xs px-2 py-1.5 rounded-full hover:bg-gray-100"
                  role="button"
                >
                  Show account
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <footer class="bg-black text-center lg:text-left w-100">
      <div class="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © {{ new Date().getFullYear() }} Francisco Coya. All rights reserved. GitHub
        repo{'https://github.com/franciscocoya'}
      </div>
    </footer>
  </main>
</template>

<style scoped></style>
