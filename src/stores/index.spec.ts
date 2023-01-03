import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { defaultList, useStore } from './index'

describe('Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('tasks list', () => {
    const store = useStore()
    expect(store.lists).toEqual(defaultList)
  })

  it('should update list title', () => {
    const mockCardId = defaultList[0].id
    const store = useStore()
    store.updateListTitle(mockCardId, 'hello world')

    expect(store.lists[0].title).toBe('hello world')
  })
})
