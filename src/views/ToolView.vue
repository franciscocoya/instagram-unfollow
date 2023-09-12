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
let errors = ref([])
let checkNewAccount = ref(false)

const handleUploadFollowers = (event) => {
  Promise.all(readMultipleJsonFiles(event))
    .then((followers) => {
      const followersMerged = mergeMultipleArrays(...followers)
      followerStore.setFollowers(
        followersMerged.map((follower) => ({
          value: follower.string_list_data[0].value,
          profile_url: follower.string_list_data[0].href
        }))
      )

      errors.value = []
    })
    .catch(() => {
      errors.value.push({
        message: "The file doesn't have valid data",
        type: 'followers'
      })
    })
}

const handleUploadFollowing = (event) => {
  try {
    readJsonFile(event, event.target.files[0]).then((followings) => {
      
      console.log(event.target.files[0])
      
      followerStore.setFollowing(
        followings.relationships_following.map((following) => ({
          value: following.string_list_data[0].value,
          profile_url: following.string_list_data[0].href
        }))
      )

      errors.value = []
    })
  } catch (error) {
    errors.value.push({
      message: "The file doesn't have valid data",
      type: 'following'
    })
  }
}

const showUnfollowers = () => {
  unfollowers.value = getUnfollowers(followerStore.followers, followerStore.following)
  checkNewAccount.value = false
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
  checkNewAccount.value = true
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

            <div v-if="errors.length > 0">
              <div
                class="max-w-xs bg-red-100 border border-red-200 text-sm text-red-500 rounded-md shadow-md"
                role="alert"
                :key="index"
                v-for="(error, index) in errors.filter((error) => error.type === 'followers')"
              >
                <div class="flex p-4">
                  {{ error.message }}

                  <div class="ml-auto">
                    <button
                      type="button"
                      class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 focus:ring-red-400 transition-all text-sm"
                      @click.prevent="errors.splice(index, 1)"
                    >
                      <span class="sr-only">Close</span>
                      <svg
                        class="w-3.5 h-3.5"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
            <div v-if="errors.length > 0">
              <div
                class="max-w-xs bg-red-100 border border-red-200 text-sm text-red-500 rounded-md shadow-md"
                role="alert"
                :key="index"
                v-for="(error, index) in errors.filter((error) => error.type === 'following')"
              >
                <div class="flex p-4">
                  {{ error.message }}

                  <div class="ml-auto">
                    <button
                      type="button"
                      class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 focus:ring-red-400 transition-all text-sm"
                      @click.prevent="errors.splice(index, 1)"
                    >
                      <span class="sr-only">Close</span>
                      <svg
                        class="w-3.5 h-3.5"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
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

      <div v-if="!checkNewAccount" class="flex flex-col gap-5">
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
