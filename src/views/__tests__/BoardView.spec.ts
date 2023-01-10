import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import BoardViewVue from '../BoardView.vue'
import { defaultList } from '@/stores'
import router from '@/router'

describe('BoardView.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BoardViewVue, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              lists: defaultList,
            },
            createSpy: vi.fn,
          }),
          router,
        ],
        stubs: { RouterView: true },
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
