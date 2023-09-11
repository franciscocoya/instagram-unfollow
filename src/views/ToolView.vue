<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import BaseTextArea from '@/components/BaseTextAreaItem.vue'
import { readJsonFile, readMultipleJsonFiles } from '@/lib/util.js'
import { useFollowerStore } from '@/stores/followerStore.js'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'

import { getUnfollowers, mergeMultipleArrays } from '@/lib/main.js'

const router = useRouter()

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

const resetAllFields = () => {
  followerStore.setFollowers([])
  followerStore.setFollowing([])
  unfollowers.value = []
}
</script>

<template>
  <main class="flex flex-col justify-between">
    <div class="flex flex-col gap-5 mb-10">
      <h1 class="text-4xl font-bold tracking-tight text-center text-white sm:text-6xl pt-10">
        Check Instagram Unfollowers
      </h1>
      <h2 class="text-2xl text-center">
        Tool to check who is not following you back on Instagram. <br /><span
          class="text-xl text-pink-300"
          >This website does not store any data</span
        >.
      </h2>
      <button
        class="w-[200px] py-3 px-4 mx-auto inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-50 text-gray-600 hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 transition-all text-lg dark:focus:ring-offset-gray-800"
        role="button"
        @click="router.push({ name: 'tutorial' })"
      >
        See tutorial
      </button>
    </div>
    <div
      :class="`grid ${
        unfollowers.length > 0
          ? 'lg:grid-cols-2 md:grid-cols-1'
          : 'lg:grid-cols-1 w-full max-w-6xl mx-auto'
      } gap-20 lg:px-40 sm:px-10 pb-10`"
    >
      <section class="flex flex-col gap-5">
        <div class="flex flex-col flex-wrap gap-10">
          <div class="flex flex-col gap-3">
            <h2
              class="text-2xl font-semibold text-pink-200 flex flex-row justify-start items-center gap-2"
            >
              <InformationCircleIcon class="w-6 h-6 text-pink-50" />
              Followers
            </h2>
            <p>Upload the file/s name followers_x.json (x is a number) from your Instagram data.</p>
            <BaseTextArea
              :onchange="handleUploadFollowers"
              :multiple="true"
              :counter="followerStore.followers?.length"
              counter-label="followers"
            />
          </div>

          <div class="flex flex-col gap-3">
            <h2
              class="text-2xl font-semibold text-pink-200 flex flex-row justify-start items-center gap-2"
            >
              <InformationCircleIcon class="w-6 h-6 text-pink-50" />
              Following
            </h2>
            <p>Upload the file whose name is following.json from your Instagram data.</p>
            <BaseTextArea
              :onchange="handleUploadFollowing"
              :counter="followerStore.following?.length"
              counter-label="following"
            />
          </div>
        </div>

        <div class="w-100 grid grid-cols-3 gap-5">
          <button
            @click.prevent="showUnfollowers"
            type="button"
            class="col-span-2 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-pink-500 text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
          >
            Show unfollowers
          </button>

          <button
            @click.prevent="resetAllFields"
            type="button"
            class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-200 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
          >
            Check new account
          </button>
        </div>
      </section>

      <div v-if="unfollowers?.length > 0" class="flex flex-col gap-5">
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
          class="h-96 overflow-y-visible overflow-x-hidden w-full bg-gray-300 rounded-md backdrop-filter backdrop-blur-sm bg-opacity-10 py-5 px-10"
        >
          <ul v-if="unfollowers?.length > 0" role="list" class="h-full w-full">
            <li v-for="(unfollower, index) in unfollowers" :key="index" class="py-5">
              <div class="flex flex-row justify-between gap-16">
                <div class="flex-shrink-0 group block">
                  <div class="flex items-center">
                    <span
                      class="inline-block h-[2.875rem] w-[2.875rem] bg-gray-100 rounded-full overflow-hidden"
                    >
                      <svg
                        class="h-full w-full text-gray-300"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.62854"
                          y="0.359985"
                          width="15"
                          height="15"
                          rx="7.5"
                          fill="white"
                        />
                        <path
                          d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                          fill="currentColor"
                        />
                        <path
                          d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <div class="ml-3">
                      <h3 class="font-semibold text-gray-800 dark:text-white">
                        {{ unfollower.value }}
                      </h3>
                      <!-- <p class="text-sm font-medium text-gray-400">maria@gmail.com</p> -->
                    </div>
                  </div>
                </div>
                <div class="min-w-0 flex flex-col justify-center items-center gap-2">
                  <a
                    :href="unfollower.profile_url"
                    class="w-[130px] py-2 px-3 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-pink-500 text-white focus:outline-none transition-all text-sm hover:bg-pink-600"
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
  </main>
</template>

<style scoped>
main::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  opacity: 0.1;
  background-image: url('@/assets/bg-home-4.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#unfollower-list-section {
  -webkit-box-shadow: 7px 7px 69px -4px rgba(255, 122, 202, 0.2);
  -moz-box-shadow: 7px 7px 69px -4px rgba(255, 122, 202, 0.2);
  box-shadow: 7px 7px 69px -4px rgba(255, 122, 202, 0.2);
}

#unfollower-list-section::-webkit-scrollbar {
  width: 0.5rem;
}
</style>
