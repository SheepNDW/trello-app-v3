import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import EditBox from '../EditBox.vue'
import { useStore } from '@/stores'

describe('EditCard.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(EditBox, {
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

  it('render correctly', () => {
    const title = (wrapper.find('[data-test="taskTitle"]').element as HTMLInputElement).value
    const content = (wrapper.find('[data-test="taskContent"]').element as HTMLTextAreaElement).value

    expect(title).toBe('Vue.js 測試')
    expect(content).toBe('內文區塊')
  })
})
