<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { useStore } from '@/stores'

const target = ref<HTMLInputElement | null>(null)
useFocus(target, { initialValue: true })

const store = useStore()
const { addNewCard } = store

const isEditing = ref(false)
const setIsEditing = (bool: boolean) => isEditing.value = bool
const title = ref('')

const addCard = () => {
  addNewCard(title.value)
  title.value = ''
  isEditing.value = false
}
</script>

<template>
  <div
    class="bg-slate-200 block border rounded-sm p-2 mx-2 border-gray-500 w-[300px] cursor-pointer bg-opacity-70 hover:bg-opacity-90 min-w-[300px]"
  >
    <div
      v-if="!isEditing"
      data-test="addCardBtn"
      class="block select-none"
      @click="setIsEditing(true)"
    >
      + 新增其他列表
    </div>
    <div v-else>
      <input
        ref="target"
        v-model="title"
        v-on-click-outside="() => setIsEditing(false)"
        data-test="addCardInput"
        type="text"
        placeholder="為列表輸入標題"
        class="block w-full p-2"
        @keydown.enter="addCard"
      >
    </div>
  </div>
</template>
