import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useRouter } from 'vue-router'
import { defaultList, useStore } from './index'

/**
 * vitest: TypeError: crypto.randomUUID is not a function
 * @see https://github.com/vitest-dev/vitest/issues/528
 */
const cryptoMock = { randomUUID: vi.fn(() => +Date.now()) }
vi.stubGlobal('crypto', cryptoMock)

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
}
vi.stubGlobal('localStorage', mockLocalStorage)

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('default tasks list', () => {
    const store = useStore()
    expect(localStorage.getItem).toHaveBeenCalledWith('trello-lists')
    expect(store.lists).toEqual(defaultList)
  })

  it('updateListTitle()', () => {
    const mockCardId = defaultList[0].id
    const store = useStore()
    store.updateListTitle(mockCardId, 'hello world')

    expect(store.lists[0].title).toBe('hello world')
    // expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('addTask()', () => {
    const store = useStore()
    const { addTask } = store
    const cardId = store.lists[0].id
    const title = 'hello vitest'

    addTask(cardId, title)

    const result = store.lists.find(list => list.id === cardId)

    expect(result?.tasks.length).toBe(3)
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('openEditTask()', () => {
    const router = useRouter()
    const store = useStore()
    const cardId = store.lists[0].id
    const taskId = store.lists[0].tasks[0].id
    const { openEditTask } = store

    openEditTask(cardId, taskId)

    expect(store.currentEditTask).toEqual({
      cardId,
      ...store.lists[0].tasks[0],
    })
    expect(router.push).toHaveBeenCalledWith(`/task/${cardId}/${taskId}`)
  })

  it('closeEditTask()', () => {
    const router = useRouter()
    const store = useStore()
    const cardId = store.lists[0].id
    const taskId = store.lists[0].tasks[0].id
    const { openEditTask, closeEditTask } = store
    openEditTask(cardId, taskId)

    closeEditTask()

    expect(store.currentEditTask).toEqual(null)
    expect(router.push).toHaveBeenCalledWith('/')
  })

  it('updateTask()', () => {
    const mockCardId = defaultList[0].id
    const mockTaskId = defaultList[0].tasks[0].id
    const store = useStore()

    store.updateTask(mockCardId, mockTaskId, 'new title', 'new content')

    expect(store.lists[0].tasks[0].title).toBe('new title')
    expect(store.lists[0].tasks[0].content).toBe('new content')
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('deleteTask()', () => {
    const mockCardId = defaultList[1].id
    const mockTaskId = defaultList[1].tasks[0].id
    const store = useStore()

    store.deleteTask(mockCardId, mockTaskId)
    expect(store.lists[1].tasks.length).toBe(1)
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('addNewCard()', () => {
    const store = useStore()

    store.addNewCard('test')

    expect(store.lists.length).toBe(3)
    expect(localStorage.setItem).toHaveBeenCalled()
  })
})
