<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/Card.vue'

const toggle = ref(false)
</script>

<template>
  <div class="bg-emerald-700 h-[100vh] w-full block overflow-x-auto overflow-y-hidden">
    <div id="board-wrapper" class="h-full w-full p-4 block overflow-auto">
      <div class="flex flex-row items-start">
        <!-- card -->
        <Card />
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
    <div v-if="toggle" class="fixed top-0 left-0 w-full h-full bg-slate-800 z-100 bg-opacity-70">
      <div class="w-1/2 h-auto block relative mx-auto top-[15vh] bg-white py-8 px-12">
        <div>
          <input ref="target" type="text" class="w-full p-2 text-xl border mb-6">
        </div>

        <textarea
          class="w-full h-[300px] p-3 overflow-x-hidden overflow-y-auto resize-none border"
        />

        <div class="text-right mt-4">
          <button class="border bg-rose-500 text-white py-2 px-4 hover:bg-rose-700 mr-6">
            刪除
          </button>
          <button class="border bg-slate-200 py-2 px-4 hover:bg-slate-400 hover:text-slate-100">
            儲存送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
