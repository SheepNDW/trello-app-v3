<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '@/components/Card.vue'
import { useStore } from '@/stores'
import EditBox from '@/components/EditBox.vue'
import AddNewCard from '@/components/AddNewCard.vue'

const store = useStore()
const list = computed(() => store.lists)
const currentEditTask = computed(() => store.currentEditTask)
</script>

<template>
  <div class="bg-emerald-700 h-[100vh] w-full block overflow-x-auto overflow-y-hidden">
    <div id="board-wrapper" class="h-full w-full p-4 block overflow-auto">
      <div class="flex flex-row items-start">
        <!-- card -->
        <Card v-for="card in list" :key="card.id" v-bind="card" />
        <!-- card -->

        <!-- add new card -->
        <AddNewCard />
        <!-- add new card -->
      </div>
    </div>

    <!-- lightbox -->
    <EditBox v-if="currentEditTask?.id" />
  </div>
</template>
