<script setup>
import FooterItem from './components/FooterItem.vue'
</script>

<template class="app-root">
  <RouterView />
  <FooterItem />
</template>

<style scoped>
.app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
