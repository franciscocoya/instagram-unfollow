<script setup>
import { ref } from 'vue'
import BaseTextArea from './components/BaseTextArea.vue'
import { readJsonFile, readMultipleJsonFiles } from './lib/util.js'
import { useFollowerStore } from './stores/followerStore.js'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { getInstagramAccountPublicInfo } from './lib/scraper.js'

import { getUnfollowers, mergeMultipleArrays } from './lib/main.js'

const followerStore = useFollowerStore()

let unfollowers = ref([])

const handleUploadFollowers = (event) => {
  Promise.all(readMultipleJsonFiles(event)).then((followers) => {
    const followersMerged = mergeMultipleArrays(...followers)
    followerStore.setFollowers(
      followersMerged.map((follower) => ({
        value: follower.string_list_data[0].value,
        profile_url: follower.string_list_data[0].href
      }))
    )
  })
}

const handleUploadFollowing = (event) => {
  readJsonFile(event, event.target.files[0]).then((followings) => {
    followerStore.setFollowing(
      followings.relationships_following.map((following) => ({
        value: following.string_list_data[0].value,
        profile_url: following.string_list_data[0].href
      }))
    )
  })
}

const showUnfollowers = () => {
  unfollowers.value = getUnfollowers(followerStore.followers, followerStore.following)
}

const filterUnfollowersByUsername = (username) => {
  if (username === '') {
    unfollowers.value = getUnfollowers(followerStore.followers, followerStore.following)
  } else {
    unfollowers.value = getUnfollowers(followerStore.followers, followerStore.following).filter(
      (unfollower) => unfollower.value.toLowerCase().includes(username.toLowerCase())
    )
  }
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
        Tool to check who is not following you back on Instagram. <br /><span
          class="text-xl text-pink-300"
          >This website does not store any data</span
        >.
      </h2>
    </div>
    <div class="grid grid-cols-2 gap-20 px-40">
      <section class="flex flex-col gap-5">
        <!-- File upload section -->

        <div class="flex flex-col flex-wrap gap-10">
          <div class="flex flex-col gap-3">
            <h2 class="text-2xl font-semibold text-pink-200 flex flex-row justify-start items-center gap-2">
              <InformationCircleIcon class="w-6 h-6 text-pink-50" />
              Followers
            </h2>
            <BaseTextArea
              :onchange="handleUploadFollowers"
              :multiple="true"
              :counter="followerStore.followers?.length"
              counter-label="followers"
            />
          </div>

          <div class="flex flex-col gap-3">
            <h2 class="text-2xl font-semibold text-pink-200 flex flex-row justify-start items-center gap-2">
              <InformationCircleIcon class="w-6 h-6 text-pink-50" />
              Following
            </h2>
            <BaseTextArea
              :onchange="handleUploadFollowing"
              :counter="followerStore.following?.length"
              counter-label="following"
            />
          </div>
        </div>

        <button
          @click.prevent="showUnfollowers"
          type="button"
          class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-pink-500 text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          Show unfollowers
        </button>
      </section>

      <div class="flex flex-col gap-5">
        <h2 v-if="unfollowers?.length > 0" class="text-xl font-light">
          Showing {{ unfollowers?.length }} accounts which not follow you back
        </h2>
        <div class="w-full">
          <div class="relative">
            <input
              type="text"
              id="hs-search-box-with-loading-1"
              name="hs-search-box-with-loading-1"
              class="py-3 px-4 pl-11 block w-full border-pink-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-950 dark:border-gray-700 dark:text-gray-50"
              placeholder="Type something..."
              @input="filterUnfollowersByUsername($event.target.value)"
            />
            <MagnifyingGlassIcon class="w-5 h-5 text-pink-200 absolute top-3 left-3" />
          </div>
        </div>
        <section
          v-if="unfollowers?.length > 0"
          id="unfollower-list-section"
          class="h-96 overflow-y-visible overflow-x-hidden w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 py-5 px-10"
        >
          <ul v-if="unfollowers?.length > 0" role="list" class="h-full w-full">
            <li v-for="(unfollower, index) in unfollowers" :key="index" class="py-5">
              <div class="flex flex-row justify-between gap-16">
                <div class="flex-shrink-0 group block">
                  <div class="flex items-center">
                    <img
                      class="inline-block flex-shrink-0 h-[3.875rem] w-[3.875rem] rounded-full"
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                      alt="Image Description"
                    />
                    <div class="ml-3">
                      <h3 class="font-semibold text-gray-800 dark:text-white">
                        {{ unfollower.value }}
                      </h3>
                      <p class="text-sm font-medium text-gray-400">maria@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div class="min-w-0 flex flex-col justify-center items-center gap-2">
                  <a
                    :href="unfollower.profile_url"
                    class="py-1 px-3 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-pink-500 text-white focus:outline-none transition-all text-sm hover:bg-pink-600"
                    role="button"
                    target="_blank"
                  >
                    Show account
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <span v-else class="text-gray-400">
          <p class="text-4xl font-semibold">No unfollowers found</p>
        </span>
      </div>
    </div>
    <!-- <footer class="bg-black text-center lg:text-left w-100">
      <div class="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © {{ new Date().getFullYear() }} Francisco Coya. All rights reserved. GitHub
        repo{'https://github.com/franciscocoya'}
      </div>
      
    </footer> -->
    <footer class="mt-auto w-full py-10 px-4 sm:px-6 lg:px-8 mx-auto bg-black">
      <div class="text-center">
        <div>
          <a
            class="flex-none text-xl font-semibold text-black dark:text-white"
            href="#"
            aria-label="Brand"
            >Instagram Unfollower Checker tool</a
          >
        </div>

        <div class="mt-3">
          <p class="text-gray-500">
            © Francisco Coya. {{ new Date().getFullYear() }}. All rights reserved.
          </p>
        </div>

        <!-- Social Brands -->
        <div class="mt-3 space-x-2">
          <a
            class="inline-flex justify-center items-center w-10 h-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-pink-200 dark:hover:bg-pink-800"
            href="mailto:info@franciscocoya.dev"
            target="_blank"
          >
            <svg
              class="w-3.5 h-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
              />
            </svg>
          </a>
          <a
            class="inline-flex justify-center items-center w-10 h-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-pink-200 dark:hover:bg-pink-800"
            href="https://github.com/franciscocoya/"
            target="_blank"
          >
            <svg
              class="w-3.5 h-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
        </div>
        <!-- End Social Brands -->
      </div>
      <!-- End Grid -->
    </footer>
  </main>
</template>

<style scoped>
#unfollower-list-section {
  -webkit-box-shadow: 7px 7px 69px -4px rgba(255, 122, 202, 0.1);
  -moz-box-shadow: 7px 7px 69px -4px rgba(255, 122, 202, 0.1);
  box-shadow: 7px 7px 69px -4px rgba(255, 122, 202, 0.1);
}

#unfollower-list-section::-webkit-scrollbar {
  width: 0.5rem;
}
</style>
