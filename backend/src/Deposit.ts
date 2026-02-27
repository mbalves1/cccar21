import AccountDAO from './AccountDAO';
import AccountAssetDAO from './AccountAssetDAO';
import { inject } from './Registry';

export default class GetAccount {
	@inject('accountDAO')
	accountDAO!: AccountDAO;
	@inject('accountAssetDAO')
	accountAssetDAO!: AccountAssetDAO;

	async execute(input: Input): Promise<void> {
		const account = await this.accountDAO.getById(input.accountId);
		if (!account) throw new Error('Account not found!');
		await this.accountAssetDAO.save(input);
	}
}

type Input = {
	accountId: string;
	assetId: string;
	quantity: number;
};
