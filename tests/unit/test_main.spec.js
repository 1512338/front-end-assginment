import { shallowMount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('App.vue', () => {
  const wrapper = shallowMount(App, {
    data() {
      return {
        buttons: [30, 20, -30 , -5],
        bars: [
          {
            id_process: 1,
            percent: 90,
            isOverload: false
          },
          {
            id_process: 2,
            percent: 30,
            isOverload: false
          },
          {
            id_process: 3,
            percent: 40,
            isOverload: false
          },
          {
            id_process: 4,
            percent: 100,
            isOverload: false
          },
        ],
        limit: 130,
      }
    }
  })

  it('has a process bar', () => {
    expect(wrapper.contains('.process-bar')).toBe(true)
  })

  it('has a select', () => {
    expect(wrapper.contains('.process-select')).toBe(true)
  })

  it('has a button', () => {
    expect(wrapper.contains('.button-number')).toBe(true)
  })

  it('click button event', () => {
    wrapper.find('.button-number').trigger('click')
    expect(wrapper.vm.bars[0].percent).toEqual(120)
  })

  // it('overload case', ()=>{
  //   wrapper.find('.button-number').trigger('click')
  //   expect(wrapper.vm.bars[0].percent).toEqual(150)
  //   expect(wrapper.find('.process-item').classes()).toContain("red");
  // })
})
