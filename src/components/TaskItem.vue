<script setup lang="ts">
defineProps<{
  id: string
  title: string
  content: string
}>()
</script>

<template>
  <div class="block my-2 w-full py-2 px-3 bg-white overflow-hidden select-none">
    <div class="block font-bold">{{ title }}</div>
    <div class="overflow-hidden text-ellipsis">{{ content }}</div>
  </div>
</template>
