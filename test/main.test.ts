import axios from 'axios';
axios.defaults.validateStatus = () => true;

test('Deve criar uma conta', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCX1234',
	};

	const responseSignup = await axios.post(
		'http://localhost:3000/signup',
		input,
	);
	console.log(responseSignup.status, responseSignup.data);

	const outputSignup = responseSignup.data;

	expect(outputSignup.accountId).toBeDefined();
	const responseGetAccount = await axios.get(
		`http://localhost:3000/accounts/${outputSignup.accountId}`,
	);
	const outputGetAccount = responseGetAccount.data;
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

	const responseSignup = await axios.post(
		'http://localhost:3000/signup',
		input,
	);
	expect(responseSignup.status).toBe(422);
	const outputSignup = responseSignup.data;
	expect(outputSignup.message).toBe('Invalid name');
});

test('Não deve criar uma conta se email for inválido', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email',
		document: '07830021066',
		password: 'mnbVCX1234',
	};

	const responseSignup = await axios.post(
		'http://localhost:3000/signup',
		input,
	);
	expect(responseSignup.status).toBe(422);
	const outputSignup = responseSignup.data;
	expect(outputSignup.message).toBe('Invalid email');
});

test('Não deve criar uma conta se documento for inválido', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '872222888',
		password: 'mnbVCX1234',
	};

	const responseSignup = await axios.post(
		'http://localhost:3000/signup',
		input,
	);
	expect(responseSignup.status).toBe(422);
	const outputSignup = responseSignup.data;
	expect(outputSignup.message).toBe('Invalid document');
});

test('Não deve criar uma conta se a senha for inválido', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCX',
	};

	const responseSignup = await axios.post(
		'http://localhost:3000/signup',
		input,
	);
	expect(responseSignup.status).toBe(422);
	const outputSignup = responseSignup.data;
	expect(outputSignup.message).toBe('Invalid password');
});

test('Não deve criar uma conta se a senha tiver menos de 8 caracteres', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCX',
	};

	const responseSignup = await axios.post(
		'http://localhost:3000/signup',
		input,
	);
	expect(responseSignup.status).toBe(422);
	const outputSignup = responseSignup.data;
	expect(outputSignup.message).toBe('Invalid password');
});

test('Não deve criar uma conta se a senha não tiver números', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCXERT',
	};

	const responseSignup = await axios.post(
		'http://localhost:3000/signup',
		input,
	);
	expect(responseSignup.status).toBe(422);
	const outputSignup = responseSignup.data;
	expect(outputSignup.message).toBe('Invalid password');
});

test('Não deve criar uma conta se a senha não tiver maiusculas', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbvhhdjjdh233',
	};

	const responseSignup = await axios.post(
		'http://localhost:3000/signup',
		input,
	);
	expect(responseSignup.status).toBe(422);
	const outputSignup = responseSignup.data;
	expect(outputSignup.message).toBe('Invalid password');
});

test('Não deve criar uma conta se a senha não tiver minusculas', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'MSIKADI@#123232',
	};

	const responseSignup = await axios.post(
		'http://localhost:3000/signup',
		input,
	);
	expect(responseSignup.status).toBe(422);
	const outputSignup = responseSignup.data;
	expect(outputSignup.message).toBe('Invalid password');
});
