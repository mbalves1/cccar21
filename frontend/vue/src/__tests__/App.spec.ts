import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../App.vue';

describe('Deve testar o componente principal', () => {
	it('deve validar 1 igual a 1', () => {
		const wrapper = mount(App, {});
		console.log('wrapper', wrapper.html);
		expect(wrapper.get('h1').text()).toBe('Ola Murilo');
	});
});
