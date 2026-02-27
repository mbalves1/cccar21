import AccountDAO from './AccountDAO';
import AccountAssetDAO from './AccountAssetDAO';
import { inject } from './Registry';

export default class GetAccount {
	@inject('accountDAO')
	accountDAO!: AccountDAO;
	@inject('accountAssetDAO')
	accountAssetDAO!: AccountAssetDAO;

	async execute(accountId: string): Promise<Output> {
		const account = await this.accountDAO.getById(accountId);
		if (!account) throw new Error('Account not found!');
		account.balances = await this.accountAssetDAO.getByAccountId(accountId);
		return account;
	}
}

type Output = {
	accountId: string;
	name: string;
	email: string;
	document: string;
	password: string;
};
