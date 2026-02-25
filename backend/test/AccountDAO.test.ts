import crypto from 'crypto';
import { AccountDAODatabase } from '../src/AccountDAO';
import Registry from '../src/Registry';
import { PgPromiseAdapter } from '../src/DatabaseConnection';

test('Deve persistir uma conta', async () => {
	Registry.getInstance().provide('databaseConnection', new PgPromiseAdapter());
	const accountDAO = new AccountDAODatabase();
	const account = {
		accountId: crypto.randomUUID(),
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCX1234',
	};

	await accountDAO.save(account);
	const savedAccount = await accountDAO.getById(account.accountId);
	expect(savedAccount.account_id).toBe(account.accountId);
	expect(savedAccount.name).toBe(account.name);
	expect(savedAccount.email).toBe(account.email);
	expect(savedAccount.document).toBe(account.document);
	expect(savedAccount.password).toBe(account.password);
});
