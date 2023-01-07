import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import AddNewCard from '../AddNewCard.vue'

describe('AddNewCard.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(AddNewCard, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
      },
    })
  })

  it('should show add card text default', () => {
    expect(wrapper.find('[data-test="addCardBtn"]').exists()).toBe(true)
    expect(wrapper.get('[data-test="addCardBtn"]').text()).contains('+ 新增其他列表')
  })

  it('should show input when addCardBtn is clicked', async () => {
    await wrapper.get('[data-test="addCardBtn"]').trigger('click')

    expect(wrapper.find('[data-test="addCardBtn"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="addCardInput"]').exists()).toBe(true)
  })
})
