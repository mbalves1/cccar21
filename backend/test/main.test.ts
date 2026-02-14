import { getAccount, signup } from '../src/main';

test('Deve criar uma conta', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCX1234',
	};

	const outputSignup = await signup(input);
	const outputGetAccount = await getAccount(outputSignup.accountId);
	expect(outputSignup.accountId).toBeDefined();
	expect(outputGetAccount.name).toBe(input.name);
	expect(outputGetAccount.email).toBe(input.email);
	expect(outputGetAccount.document).toBe(input.document);
	expect(outputGetAccount.password).toBe(input.password);
});

test('Não deve criar uma conta se nome for inválido', async () => {
	const input = {
		name: 'John',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCX1234',
	};
	await expect(() => signup(input)).rejects.toThrow(new Error('Invalid name'));
});

test('Não deve criar uma conta se email for inválido', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email',
		document: '07830021066',
		password: 'mnbVCX1234',
	};

	await expect(() => signup(input)).rejects.toThrow(new Error('Invalid email'));
});

test('Não deve criar uma conta se documento for inválido', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '872222888',
		password: 'mnbVCX1234',
	};

	await expect(() => signup(input)).rejects.toThrow(
		new Error('Invalid document'),
	);
});

test('Não deve criar uma conta se a senha for inválido', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCX',
	};

	await expect(() => signup(input)).rejects.toThrow(
		new Error('Invalid password'),
	);
});

test('Não deve criar uma conta se a senha tiver menos de 8 caracteres', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCX',
	};

	await expect(() => signup(input)).rejects.toThrow(
		new Error('Invalid password'),
	);
});

test('Não deve criar uma conta se a senha não tiver números', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCXERT',
	};

	await expect(() => signup(input)).rejects.toThrow(
		new Error('Invalid password'),
	);
});

test('Não deve criar uma conta se a senha não tiver maiusculas', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbvhhdjjdh233',
	};

	await expect(() => signup(input)).rejects.toThrow(
		new Error('Invalid password'),
	);
});

test('Não deve criar uma conta se a senha não tiver minusculas', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'MSIKADI@#123232',
	};

	await expect(() => signup(input)).rejects.toThrow(
		new Error('Invalid password'),
	);
});
