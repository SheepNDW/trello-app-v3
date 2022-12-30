import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BoardViewVue from '../BoardView.vue'

describe('BoardView.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BoardViewVue)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
