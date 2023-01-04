<script setup lang="ts">
import { ref } from 'vue'
import { useFocus } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'
import { useStore } from '@/stores'

const props = defineProps<{ id: string }>()

const target = ref<HTMLTextAreaElement | null>(null)
useFocus(target, { initialValue: true })

const isEditing = ref(false)
const setIsEditing = (bool: boolean) => isEditing.value = bool

const newTaskTitle = ref('')

const { addTask } = useStore()
const addTaskToCard = () => {
  addTask(props.id, newTaskTitle.value)
  newTaskTitle.value = ''
  setIsEditing(false)
}
</script>

<template>
  <div class="my-3" data-test="root">
    <div
      v-if="!isEditing"
      data-test="addTaskBtn"
      class="bg-slate-200 p-2 hover:bg-slate-300 cursor-pointer text-slate-500"
      @click="setIsEditing(true)"
    >
      + 點擊以新增任務
    </div>
    <textarea
      v-else
      ref="target"
      v-model="newTaskTitle"
      v-on-click-outside="() => setIsEditing(false)"
      data-test="addTaskInput"
      class="block w-full resize-none p-2 h-10"
      placeholder="為這張卡片輸入標題"
      @keydown.enter="addTaskToCard"
    />
  </div>
</template>
