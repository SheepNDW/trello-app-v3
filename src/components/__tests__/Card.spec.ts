import { beforeEach, describe, expect, it, vi } from 'vitest'
import { type VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import Card from '../Card.vue'
import { defaultList } from '@/stores'

describe('Card.vue', () => {
  describe('list title', () => {
    let wrapper: VueWrapper<any>
    beforeEach(() => {
      wrapper = mount(Card, {
        props: defaultList[0],
        attachTo: document.body,
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

    it('should show text default', () => {
      expect(wrapper.find('[data-test="titleText"]').exists()).toBe(true)
      expect(wrapper.find('[data-test="titleTextInput"]').exists()).toBe(false)
    })

    it('should show input when title is clicked', async () => {
      await wrapper.find('[data-test="titleText"]').trigger('click')

      expect(wrapper.find('[data-test="titleText"]').exists()).toBe(false)
      expect(wrapper.find('[data-test="titleTextInput"]').exists()).toBe(true)
    })

    it('should auto focus when titleTextInput is shown', async () => {
      await wrapper.find('[data-test="titleText"]').trigger('click')

      expect(wrapper.find('[data-test="titleTextInput"]').element).toBe(document.activeElement)
    })

    it('should show plain text when press enter', async () => {
      await wrapper.find('[data-test="titleText"]').trigger('click')

      await wrapper.find('[data-test="titleTextInput"]').trigger('keydown.enter')

      expect(wrapper.find('[data-test="titleTextInput"]').exists()).toBe(false)
      expect(wrapper.find('[data-test="titleText"]').exists()).toBe(true)
    })

    it('should not show plain text when click inside of textarea', async () => {
      await wrapper.find('[data-test="titleText"]').trigger('click')

      await wrapper.find('[data-test="titleTextInput"]').trigger('click')

      expect(wrapper.find('[data-test="titleText"]').exists()).toBe(false)
    })

    it('should show plain text when click outside of textarea', async () => {
      await wrapper.find('[data-test="titleText"]').trigger('click')

      await wrapper.find('[data-test="root"]').trigger('click')

      expect(wrapper.find('[data-test="titleText"]').exists()).toBe(true)
    })
  })
})
