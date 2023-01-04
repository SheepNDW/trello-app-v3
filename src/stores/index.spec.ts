import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { defaultList, useStore } from './index'

/**
 * vitest: TypeError: crypto.randomUUID is not a function
 * @see https://github.com/vitest-dev/vitest/issues/528
 */
const cryptoMock = { randomUUID: vi.fn(() => +Date.now()) }
vi.stubGlobal('crypto', cryptoMock)

describe('Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('default tasks list', () => {
    const store = useStore()
    expect(store.lists).toEqual(defaultList)
  })

  it('updateListTitle()', () => {
    const mockCardId = defaultList[0].id
    const store = useStore()
    store.updateListTitle(mockCardId, 'hello world')

    expect(store.lists[0].title).toBe('hello world')
  })

  it('addTask()', () => {
    const store = useStore()
    const { addTask } = store
    const cardId = store.lists[0].id
    const title = 'hello vitest'

    addTask(cardId, title)

    const result = store.lists.find(list => list.id === cardId)

    expect(result?.tasks.length).toBe(3)
  })
})
