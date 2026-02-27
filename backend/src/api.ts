import { AccountDAODatabase } from './AccountDAO';
import { AccountAssetDAODatabase } from './AccountAssetDAO';
import AccountService from './AccountService';
import Registry from './Registry';
import { ExpressAdapter } from './HttpServer';
import { PgPromiseAdapter } from './DatabaseConnection';
import AccountController from './AccountController';
import Signup from './Signup';
import GetAccount from './GetAccount';

// Entrypoint
async function main() {
	const httpServer = new ExpressAdapter();
	Registry.getInstance().provide('databaseConnection', new PgPromiseAdapter());
	Registry.getInstance().provide('accountDAO', new AccountDAODatabase());
	Registry.getInstance().provide(
		'accountAssetDAO',
		new AccountAssetDAODatabase(),
	);
	Registry.getInstance().provide('accountService', new AccountService());
	Registry.getInstance().provide('httpServer', httpServer);
	Registry.getInstance().provide('signup', new Signup());
	Registry.getInstance().provide('getAccount', new GetAccount());

	new AccountController();
	httpServer.listen(3000);
}

main();
