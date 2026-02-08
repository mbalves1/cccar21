import { validatePassword } from '../src/validatePassword';

test.each(['asdWQWEW1233'])('Deve validar a senha: %s', (password: string) => {
	const isValid = validatePassword(password);
	expect(isValid).toBe(true);
});

test.each(['asd', 'asdWQWEW', 'asd1233', 'WQWEW1233'])(
	'Não deve validar a senha: %s',
	(password: string) => {
		const isValid = validatePassword(password);
		expect(isValid).toBe(false);
	},
);
