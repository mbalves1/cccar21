import crypto from 'crypto';
import pgp from 'pg-promise';
import { validateCpf } from './validateCpf';
import { validatePassword } from './validatePassword';
import { validateEmail } from './validateEmail';
import { validateName } from './validateName';
import AccountDAO, { AccountDAODatabase } from './AccountDAO';
import Registry from './Registry';

export default class AccountService {
	accountDAO: AccountDAO;

	constructor(readonly registry: Registry) {
		this.accountDAO = registry.inject('accountDAO');
	}

	async signup(account: any) {
		account.accountId = crypto.randomUUID();
		if (!validateName(account.name)) throw new Error('Invalid name');
		if (!validateEmail(account.email)) throw new Error('Invalid email');
		if (!validateCpf(account.document)) throw new Error('Invalid document');
		if (!validatePassword(account.password))
			throw new Error('Invalid password');
		await this.accountDAO.save(account);
		return {
			accountId: account.accountId,
		};
	}

	async getAccount(accountId: any) {
		const account = await this.accountDAO.getById(accountId);
		return account;
	}
}
