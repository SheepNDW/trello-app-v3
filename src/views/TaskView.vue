<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EditBox from '@/components/EditBox.vue'
import { useStore } from '@/stores'

const store = useStore()
const currentEditTask = computed(() => store.currentEditTask)
const { openEditTask } = store

const route = useRoute()
const { params } = route
const cardId = computed(() => (params.cardId) as string)
const taskId = computed(() => (params.taskId) as string)

onMounted(() => {
  if (cardId.value && taskId.value) openEditTask(cardId.value, taskId.value)
})
</script>

<template>
  <EditBox v-if="currentEditTask?.id" />
</template>
