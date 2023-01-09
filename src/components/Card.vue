<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { useFocus } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'
import AddNewTask from './AddNewTask.vue'
import TaskItem from './TaskItem.vue'
import type { Tasks } from '@/types'
import { useStore } from '@/stores'

const props = defineProps<{
  /** 卡片 id */
  id: string
  title: string
  tasks: Tasks
}>()

const { updateListTitle, openEditTask } = useStore()

const listTitle = ref(props.title)
const isTitleEditing = ref(false)
const setIsTitleEditing = (bool: boolean) => isTitleEditing.value = bool

watch(isTitleEditing, () => {
  updateListTitle(props.id, listTitle.value)
})

const target = ref<HTMLTextAreaElement | null>(null)
useFocus(target, { initialValue: true })
</script>

<template>
  <div
    data-test="root"
    class="bg-slate-200 block border rounded-sm p-2 mx-2 border-gray-500 min-w-[300px]"
  >
    <!-- column -->
    <div
      v-if="!isTitleEditing"
      class="block overflow-hidden text-ellipsis w-4/5 text-lg"
      data-test="titleText"
      @click="setIsTitleEditing(true)"
    >
      {{ title }}
    </div>
    <textarea
      v-else
      ref="target"
      v-model="listTitle"
      v-on-click-outside="() => setIsTitleEditing(false)"
      class="resize-none overflow-hidden border-none w-full p-1 h-8 block"
      data-test="titleTextInput"
      @keydown.enter="setIsTitleEditing(false)"
    />

    <!-- tasks -->
    <draggable :list="tasks" item-key="id" group="task" ghost-class="opacity-30">
      <template #item="{ element }">
        <TaskItem
          v-bind="element"
          @click="openEditTask(props.id, element.id)"
        />
      </template>
    </draggable>
    <!-- tasks -->

    <!-- add new task -->
    <AddNewTask :id="id" />
    <!-- add new task -->
  </div>
</template>
