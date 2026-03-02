import AccountDAO from './AccountDAO';
import AccountAssetDAO from './AccountAssetDAO';
import { inject } from './Registry';

export default class Withdraw {
	@inject('accountDAO')
	accountDAO!: AccountDAO;
	@inject('accountAssetDAO')
	accountAssetDAO!: AccountAssetDAO;

	async execute(input: Input): Promise<void> {
		const account = await this.accountDAO.getById(input.accountId);
		if (!account) throw new Error('Account not found');
		account.balances = await this.accountAssetDAO.getByAccountId(
			input.accountId,
		);

		const balance = account.balances.find(
			(balance: any) => balance.asset_id === input.assetId,
		);
		const quantity = parseFloat(balance.quantity) - input.quantity;
		if (quantity < 0) throw new Error('Insuficient');
		await this.accountAssetDAO.update({
			accountId: input.accountId,
			assetId: input.assetId,
			quantity,
		});
	}
}

type Input = {
	accountId: string;
	assetId: string;
	quantity: number;
};
