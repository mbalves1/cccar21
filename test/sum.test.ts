import { sum } from '../src/sum';
test('Deve somar', () => {
	const result = sum(2, 2);
	expect(result).toBe(4);
});
