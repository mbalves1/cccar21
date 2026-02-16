import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../App.vue';
import { AccountGatewayHttp } from '@/AccountGateway';

function sleep(timer: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, timer);
	});
}

describe('Deve testar o componente principal', () => {
	it('deve validar 1 igual a 1', async () => {
		const accountGateway = new AccountGatewayHttp();
		const wrapper = mount(App, {
			global: {
				provide: {
					accountGateway,
				},
			},
		});
		console.log('wrapper', wrapper.html);
		const input = {
			name: 'John Doe',
			email: 'john.doe@email.com',
			document: '07830021066',
			password: 'mnbVCX1234',
		};
		await wrapper.get('.input-name').setValue(input.name);
		await wrapper.get('.input-email').setValue(input.email);
		await wrapper.get('.input-document').setValue(input.document);
		await wrapper.get('.input-password').setValue(input.password);
		await wrapper.get('.button-signup').trigger('click');
		await sleep(200);
		expect(wrapper.get('.span-message').text()).toBe('success');
		expect(wrapper.get('.span-account-id').text()).toBeDefined();
	});

	it('Não deve criar uma conta se o nome for invalido', async () => {
		const accountGateway = new AccountGatewayHttp();
		const wrapper = mount(App, {
			global: {
				provide: {
					accountGateway,
				},
			},
		});
		const input = {
			name: 'John',
			email: 'john.doe@email.com',
			document: '07830021066',
			password: 'mnbVCX1234',
		};
		await wrapper.get('.input-name').setValue(input.name);
		await wrapper.get('.input-email').setValue(input.email);
		await wrapper.get('.input-document').setValue(input.document);
		await wrapper.get('.input-password').setValue(input.password);
		await wrapper.get('.button-signup').trigger('click');
		await sleep(200);
		expect(wrapper.get('.span-message').text()).toBe('Invalid name');
	});
});
