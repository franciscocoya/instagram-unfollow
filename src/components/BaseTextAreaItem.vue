<script setup>
import { ArrowUpTrayIcon, CheckCircleIcon } from '@heroicons/vue/24/solid'

defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  counter: {
    type: Number,
    default: 0
  },
  counterLabel: {
    type: String,
    default: 'files selected'
  }
})

const emit = defineEmits(['onchange'])

function handleUploadFile() {
  emit('onchange')
}
</script>

<template>
  <div class="relative w-full">
    <label
      class="flex justify-center w-full h-32 px-4 transition bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 border-gray-200 border-dashed rounded-md appearance-none cursor-pointer hover:border-pink-400 focus:outline-none focus:border-pink-400"
    >
      <span class="flex items-center space-x-2">
        <ArrowUpTrayIcon class="w-6 h-6 text-gray-200" />

        <span class="font-medium text-gray-200">
          Drop files to Attach, or
          <span class="text-pink-600 underline">browse</span>
        </span>
      </span>
      <input
        type="file"
        :multiple="multiple"
        name="file_upload"
        class="hidden"
        @change="handleUploadFile"
        accept="application/JSON"
      />
    </label>

    <!-- Counter -->
    <div v-if="counter > 0" class="flex justify-center absolute bottom-4 right-4 mt-2 space-x-2">
      <span
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
      >
        {{ counter }}
      </span>
      <span class="text-gray-400 text-xs font-medium">{{ counterLabel }}</span>
    </div>
    <!-- File upload checker -->
    <CheckCircleIcon v-if="counter > 0" class="w-6 h-6 text-pink-100 absolute top-4 right-4" />
  </div>
</template>
