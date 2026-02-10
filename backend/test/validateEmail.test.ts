import { validateEmail } from '../src/validateEmail';

test.each(['joedoe@email.com'])('Deve validar o email: %s', (email: string) => {
	const isValid = validateEmail(email);
	console.log('isvalid', isValid);

	expect(isValid).toBe(true);
});

test.each(['joe@email', 'joe@', 'joe@.com'])(
	'Não deve validar o email: %s',
	(email: string) => {
		const isValid = validateEmail(email);
		expect(isValid).toBe(false);
	},
);
