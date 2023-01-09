import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TaskView from '../TaskView.vue'
import { useStore } from '@/stores'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    params: {
      cardId: '61bblwnux0tlb1vp3qk',
      taskId: '79bcdufvlfdlb1voaq5',
    },
  })),
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('TaskView.vue', () => {
  beforeEach(() => {
    mount(TaskView, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn,
            initialState: {
              store: {
                currentEditTask: {
                  cardId: '61bblwnux0tlb1vp3qk',
                  id: '79bcdufvlfdlb1voaq5',
                  title: 'Vue.js 測試',
                  content: '內文區塊',
                },
              },
            },
          }),
        ],
      },
    })
  })

  it('should automatically open the light box from specified URL', () => {
    const store = useStore()
    const { openEditTask } = store

    expect(openEditTask).toHaveBeenCalledWith('61bblwnux0tlb1vp3qk', '79bcdufvlfdlb1voaq5')
  })
})
