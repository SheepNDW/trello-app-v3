<script setup lang="ts">
import { computed, ref } from 'vue'
import Card from '@/components/Card.vue'
import { useStore } from '@/stores'
import EditBox from '@/components/EditBox.vue'

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
        <div
          class="bg-slate-200 block border rounded-sm p-2 mx-2 border-gray-500 w-[300px] cursor-pointer bg-opacity-70 hover:bg-opacity-90 min-w-[300px]"
        >
          <div class="block select-none">+ 新增其他列表</div>
          <!-- <div>
            <input type="text" ref="target" placeholder="為列表輸入標題" class="block w-full p-2" />
          </div> -->
        </div>
        <!-- add new card -->
      </div>
    </div>

    <!-- lightbox -->
    <EditBox v-if="currentEditTask?.id" />
  </div>
</template>
