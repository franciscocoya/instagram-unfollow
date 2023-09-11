<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  buttonText: {
    type: String,
    required: true
  },

  buttonStyle: {
    type: String,
    required: false,
    default: 'primary'
  },

  buttonWidth: {
    type: String,
    required: false,
    default: '200px'
  },

  isFullWidth: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['click'])
const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button
    :class="`${
      isFullWidth ? 'w-full' : 'w-[{{buttonWidth}}]'
    } py-3 px-4 mx-auto inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold 
    ${
      buttonStyle === 'primary'
        ? 'bg-gray-50 text-gray-600 hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-100'
        : 'bg-pink-500 text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500'
    } 
    focus:ring-offset-2 transition-all text-lg dark:focus:ring-offset-gray-800`"
    role="button"
    @click="handleClick"
  >
    {{ buttonText }}
  </button>
</template>
