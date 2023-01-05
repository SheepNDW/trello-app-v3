<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '@/stores'

const store = useStore()
const currentEditTask = computed(() => store.currentEditTask)

const title = ref(currentEditTask.value?.title)
const content = ref(currentEditTask.value?.content)
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-slate-800 z-100 bg-opacity-70">
    <div class="w-1/2 h-auto block relative mx-auto top-[15vh] bg-white py-8 px-12">
      <div>
        <input
          ref="target"
          v-model="title"
          data-test="taskTitle"
          type="text"
          class="w-full p-2 text-xl border mb-6"
        >
      </div>

      <textarea
        v-model="content"
        data-test="taskContent"
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
</template>
