import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CurrentEditTask, TaskItem, TasksList } from '@/types'
import { randomUUID } from '@/utils'

export const defaultList: TasksList = [
  {
    id: '61bblwnux0tlb1vp3qk',
    title: 'Hello Vue.js!',
    tasks: [
      {
        id: '79bcdufvlfdlb1voaq5',
        title: 'Vue.js 測試',
        content: '內文區塊',
      },
      {
        id: '4ffywwh2sfelb1vob44',
        title: 'Vue.js 測試2',
        content: '內文區塊2',
      },
    ],
  },
  {
    id: '1ix2wxwsldblb1vpa4h',
    title: 'Hello Laravel!',
    tasks: [
      {
        id: 'zm3frri5a4lb0l8c2e',
        title: 'Laravel 測試',
        content: '內文區塊',
      },
      {
        id: 'b8ijxyk2o9lb1vnzio',
        title: 'Laravel 測試2',
        content: '內文區塊2',
      },
    ],
  },
]

export const useStore = defineStore('store', () => {
  const lists = ref<TasksList>(defaultList)

  const currentEditTask = ref<CurrentEditTask | null>(null)

  const updateListTitle = (cardId = '', title = '') => {
    const card = lists.value.find(list => list.id === cardId)
    if (card) card.title = title
  }

  const addTask = (cardId = '', title = '') => {
    if (!cardId || !title) return

    const card = lists.value.find(list => list.id === cardId)
    card?.tasks.push({
      id: randomUUID(),
      title,
      content: '',
    })
  }

  const openEditTask = (cardId: string, taskId: string) => {
    const card = lists.value.find(list => list.id === cardId)!
    const task = card.tasks.find(task => task.id === taskId)!

    currentEditTask.value = {
      cardId,
      ...task,
    }
  }

  const closeEditTask = () => {
    currentEditTask.value = null
  }

  const updateTask = (cardId: string, taskId: string, title = '', content = '') => {
    const card = lists.value.find(list => list.id === cardId)
    const task = card?.tasks.find(task => task.id === taskId) as TaskItem

    task.title = title
    task.content = content
    closeEditTask()
  }

  return {
    lists,
    updateListTitle,
    addTask,
    currentEditTask,
    openEditTask,
    closeEditTask,
    updateTask,
  }
})
