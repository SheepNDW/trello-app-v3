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
})
