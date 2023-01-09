<script setup lang="ts">
import { computed } from 'vue'
import draggable from 'vuedraggable'
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
      <draggable
        :list="list"
        group="card"
        item-key="id"
        ghost-class="opacity-30"
        class="flex flex-row items-start"
      >
        <!-- card -->
        <template #item="{ element }">
          <Card v-bind="element" />
        </template>

        <!-- add new card -->
        <template #footer>
          <AddNewCard />
        </template>
      </draggable>
    </div>

    <!-- lightbox -->
    <EditBox v-if="currentEditTask?.id" />
  </div>
</template>
