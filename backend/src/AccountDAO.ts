import { PgPromiseAdapter } from './DatabaseConnection';

export default interface AccountDAO {
	save(account: any): Promise<void>;
	getById(accountId: string): Promise<any>;
}

export class AccountDAODatabase implements AccountDAO {
	async save(account: any): Promise<void> {
		const connection = new PgPromiseAdapter();
		await connection.query(
			'insert into cccar.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)',
			[
				account.accountId,
				account.name,
				account.email,
				account.document,
				account.password,
				account.message,
			],
		);
		await connection.close();
	}

	async getById(accountId: string): Promise<any> {
		const connection = new PgPromiseAdapter();
		const [account] = await connection.query(
			'select * from cccar.account where account_id = $1',
			[accountId],
		);
		await connection.close();
		return account;
	}
}

export class AccountDAOMemory implements AccountDAO {
	accounts: any[] = [];

	async save(account: any): Promise<void> {
		this.accounts.push(account);
	}

	async getById(accountId: string): Promise<any> {
		return this.accounts.find(
			(account: any) => account.accountId === accountId,
		);
	}
}
