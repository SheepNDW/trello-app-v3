import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { defaultList } from './fixture'
import type { CurrentEditTask, TaskItem, TasksList } from '@/types'
import { randomUUID } from '@/utils'

export const useStore = defineStore('store', () => {
  const router = useRouter()
  const lists = ref<TasksList>(JSON.parse(localStorage.getItem('trello-lists') || 'null') || defaultList)

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

    router.push(`/task/${cardId}/${taskId}`)
  }

  const closeEditTask = () => {
    currentEditTask.value = null
    router.push('/')
  }

  const updateTask = (cardId: string, taskId: string, title = '', content = '') => {
    const card = lists.value.find(list => list.id === cardId)
    const task = card?.tasks.find(task => task.id === taskId) as TaskItem

    task.title = title
    task.content = content
    closeEditTask()
  }

  const deleteTask = (cardId: string, taskId: string) => {
    const card = lists.value.find(list => list.id === cardId)
    if (card) card.tasks = card.tasks.filter(task => task.id !== taskId)
    closeEditTask()
  }

  const addNewCard = (title: string) => {
    if (!title.trim()) return

    lists.value.push({
      id: randomUUID(),
      title,
      tasks: [],
    })
  }

  // 當 list 變動時，將變動後的值存入 localStorage
  watch(
    () => lists.value,
    (val) => {
      localStorage.setItem('trello-lists', JSON.stringify(val))
    },
    { deep: true },
  )

  return {
    lists,
    updateListTitle,
    addTask,
    currentEditTask,
    openEditTask,
    closeEditTask,
    updateTask,
    deleteTask,
    addNewCard,
  }
})
