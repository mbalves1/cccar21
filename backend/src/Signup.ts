import AccountDAO from './AccountDAO';
import { inject } from './Registry';
import { validateCpf } from './validateCpf';
import { validatePassword } from './validatePassword';
import { validateEmail } from './validateEmail';
import { validateName } from './validateName';

export default class Signup {
	@inject('accountDAO')
	accountDAO!: AccountDAO;

	async execute(input: Input): Promise<Output> {
		const account = {
			accountId: crypto.randomUUID(),
			...input,
		};
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
}

type Input = {
	name: string;
	email: string;
	document: string;
	password: string;
};

type Output = {
	accountId: string;
};
