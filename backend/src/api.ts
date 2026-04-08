import { AccountDAODatabase } from './infra/dao/AccountDAO';
import { AccountAssetDAODatabase } from './infra/dao/AccountAssetDAO';
// import AccountService from './application/service/AccountService';
import Registry from './infra/di/Registry';
import { ExpressAdapter } from './infra/http/HttpServer';
import { PgPromiseAdapter } from './infra/database/DatabaseConnection';
import AccountController from './infra/controller/AccountController';
import Signup from './application/usecase/Signup';
import GetAccount from './application/usecase/GetAccount';
import Deposit from './application/usecase/Deposit';
import { AccountRepositoryDatabase } from './infra/repository/AccountRepository';
import { OrderRepositoryDatabase } from './infra/repository/OrderRepository';
import GetOrder from './application/usecase/GetOrder';
import PlaceOrder from './application/usecase/PlaceOrder';
import GetDepth from './application/usecase/GetDepth';
import OrderController from './infra/controller/OrderController';
import ExecuteOrder from './application/usecase/ExecuteOrder';
import { MediatorMemory } from './infra/mediator/Mediator';
import Book from './domain/Book';
import Order from './domain/Order';

// Entrypoint
async function main() {
	const httpServer = new ExpressAdapter();
	Registry.getInstance().provide('databaseConnection', new PgPromiseAdapter());
	Registry.getInstance().provide('accountDAO', new AccountDAODatabase());
	Registry.getInstance().provide(
		'accountAssetDAO',
		new AccountAssetDAODatabase(),
	);
	Registry.getInstance().provide(
		'accountRepository',
		new AccountRepositoryDatabase(),
	);
	const orderRepository = new OrderRepositoryDatabase();
	Registry.getInstance().provide('orderRepository', orderRepository);
	// Registry.getInstance().provide('accountService', new AccountService());
	Registry.getInstance().provide('httpServer', httpServer);
	Registry.getInstance().provide('signup', new Signup());
	Registry.getInstance().provide('getAccount', new GetAccount());
	Registry.getInstance().provide('deposit', new Deposit());
	Registry.getInstance().provide('getOrder', new GetOrder());
	Registry.getInstance().provide('placeOrder', new PlaceOrder());
	Registry.getInstance().provide('getDepth', new GetDepth());
	const executeOrder = new ExecuteOrder();
	const mediator = new MediatorMemory();
	const book = new Book('BTC-USD');
	Registry.getInstance().provide('mediator', mediator);
	mediator.register('orderPlaced', async (order: Order) => {
		await book.insert(order);
		// await executeOrder.execute(order.marketId);
	});
	mediator.register('orderFilled', async (order: Order) => {
		await orderRepository.update(order);
	});
	new AccountController();
	new OrderController();
	httpServer.listen(3000);
}

main();
