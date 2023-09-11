import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/ToolView.vue'),
    meta: {
      title: 'Home',
      transition: 'fade',
      metaTags: [
        {
          name: 'og:title',
          content: 'Instagram Unfollower Checker | Francisco Coya'
        },
        {
          name: 'description',
          content: 'Instagram unfollower checker tool (unofficial).'
        },
        {
          property: 'og:description',
          content: 'Instagram unfollower checker tool (unofficial).'
        }
      ]
    }
  },
  {
    path: '/tutorial',
    name: 'tutorial',
    component: () => import('@/views/TutorialView.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
