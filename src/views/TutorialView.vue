<script setup>
import { useRouter } from 'vue-router'
import BaseButtonItem from '@/components/buttons/BaseButtonItem.vue'
import { WrenchIcon } from '@heroicons/vue/24/solid'

const router = useRouter()

const handleRedirectToInstagramHelp = () => {
  window.open('https://help.instagram.com/181231772500920', '_blank')
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-5 mb-10">
      <h1 class="text-4xl font-bold tracking-tight text-center text-white sm:text-6xl pt-10">
        Quick Guide
      </h1>
      <h2 class="text-2xl text-center w-3/5 mx-auto">
        This app not depends on your Instagram account. It's just a tool to help you to find your
        unfollowers. Use it now!
      </h2>
      <button
        class="w-[200px] py-3 px-4 mx-auto inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-50 text-gray-600 hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 transition-all text-lg dark:focus:ring-offset-gray-800"
        role="button"
        @click="router.push({ name: 'home' })"
      >
        <WrenchIcon class="w-6 h-6 text-gray-600" />
        Use Now
      </button>
    </div>

    <div class="w-3/5 mx-auto">
      <ol class="flex flex-col gap-8">
        <li>Access to your personal Instagram account</li>
        <li>
          Select the three line icon in the top right corner > Settings > Security > Data Download >
          Request Download. In the "Information format" section select JSON.
        </li>

        <BaseButtonItem
          buttonText="More information"
          buttonStyle="secondary"
          buttonWidth="400px"
          @click="handleRedirectToInstagramHelp"
        />

        <li>Wait for the email from Instagram with the link to download your data</li>
        <li>
          Download the file and upload it to this app. Extract the .ZIP in a save location on your
          computer.
        </li>
        <li>
          Afterwards, open the file manager on your computer and find the folder named
          "followers_and_following"
          <img src="@/assets/screenshot_igdata_downloaded.jpg" alt="" width="450" height="auto" />
        </li>
        <li>
          Upload the file "following.json" and "follower_1.json" to this app. It could be that you
          have more than one follower file. In this case, upload all of them.

          <img
            src="@/assets/screenshot_igdata_selected_files.jpg"
            alt=""
            width="400"
            height="auto"
          />
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
ol {
  list-style-type: decimal;
  list-style-position: inside;
}

ol > li {
  font-size: 1.25rem;
  color: #fff;
}

ol > li::marker {
  color: lightgray;
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
}
</style>
