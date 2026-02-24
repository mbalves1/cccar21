import { AccountDAODatabase } from './AccountDAO';
import { AccountAssetDAODatabase } from './AccountAssetDAO';
import AccountService from './AccountService';
import Registry from './Registry';
import { ExpressAdapter } from './HttpServer';
import { PgPromiseAdapter } from './DatabaseConnection';

Registry.getInstance().provide('databaseConnection', new PgPromiseAdapter());
Registry.getInstance().provide('accountDAO', new AccountDAODatabase());
Registry.getInstance().provide(
	'accountAssetDAO',
	new AccountAssetDAODatabase(),
);
const accountService = new AccountService();
const httpServer = new ExpressAdapter();

httpServer.route('post', '/signup', async (params: any, body: any) => {
	console.log('body', body);

	const output = await accountService.signup(body);
	return output;
});

httpServer.route(
	'get',
	'/accounts/:accountId',
	async (params: any, body: any) => {
		const output = await accountService.getAccount(params.accountId);
		return output;
	},
);

httpServer.listen(3000);
