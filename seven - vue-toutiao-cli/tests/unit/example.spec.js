import { expect }  from 'chai';
import {shallowMount} from '@vue/test-utils';
import Tab from "@/components/tab.vue";

describe('检测tab.vue', () => {
    it('检测 tab.vue 是否被正常渲染', () => {
        const wrapper = shallowMount(Tab, {
            propsData: {
                tabs: [
                    {
                        title: 'tab1111'
                    },
                    {
                        title: 'tab2222'
                    }
                ]
            }
        })
        expect(wrapper.contains('.item')).to.equal(true);
    })
});
