import { getAccountById, saveAccount } from '../src/data';
import crypto from 'crypto';

test('Deve persistir uma conta', async () => {
	const account = {
		accountId: crypto.randomUUID(),
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCX1234',
	};

	await saveAccount(account);
	const savedAccount = await getAccountById(account.accountId);
	expect(savedAccount.account_id).toBe(account.accountId);
	expect(savedAccount.name).toBe(account.name);
	expect(savedAccount.email).toBe(account.email);
	expect(savedAccount.document).toBe(account.document);
	expect(savedAccount.password).toBe(account.password);
});
