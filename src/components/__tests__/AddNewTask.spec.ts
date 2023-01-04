import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import AddNewTask from '../AddNewTask.vue'

describe('AddNewTask.vue', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(AddNewTask, {
      attachTo: document.body,
      props: {
        id: '61bblwnux0tlb1vp3qk',
      },
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

  it('should show add task text default', () => {
    expect(wrapper.find('[data-test="addTaskBtn"]').exists()).toBe(true)
    expect(wrapper.get('[data-test="addTaskBtn"]').text()).contains('+ 點擊以新增任務')
  })

  it('should show input when addTaskBtn is clicked', async () => {
    await wrapper.get('[data-test="addTaskBtn"]').trigger('click')

    expect(wrapper.find('[data-test="addTaskBtn"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="addTaskInput"]').exists()).toBe(true)
  })

  it('should auto focus when addTaskInput is shown', async () => {
    await wrapper.get('[data-test="addTaskBtn"]').trigger('click')

    expect(wrapper.get('[data-test="addTaskInput"]').element).toBe(document.activeElement)
  })

  it('should show add task text when pressing enter', async () => {
    await wrapper.get('[data-test="addTaskBtn"]').trigger('click')

    await wrapper.get('[data-test="addTaskInput"]').trigger('keydown.enter')

    expect(wrapper.find('[data-test="addTaskInput"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="addTaskBtn"]').exists()).toBe(true)
  })

  it('should not show addTaskBtn when click inside of textarea', async () => {
    await wrapper.get('[data-test="addTaskBtn"]').trigger('click')

    await wrapper.get('[data-test="addTaskInput"]').trigger('click')

    expect(wrapper.find('[data-test="addTaskBtn"]').exists()).toBe(false)
  })

  it('should show addTaskBtn when click outside of textarea', async () => {
    await wrapper.get('[data-test="addTaskBtn"]').trigger('click')

    await wrapper.get('[data-test="root"]').trigger('click')

    expect(wrapper.find('[data-test="addTaskBtn"]').exists()).toBe(true)
  })
})
