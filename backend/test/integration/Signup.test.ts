import { AccountRepositoryDatabase } from '../../src/infra/repository/AccountRepository';
import GetAccount from '../../src/application/usecase/GetAccount';
import Signup from '../../src/application/usecase/Signup';
import { AccountAssetDAODatabase } from '../../src/infra/dao/AccountAssetDAO';
import { AccountDAODatabase } from '../../src/infra/dao/AccountDAO';
import DatabaseConnection, {
	PgPromiseAdapter,
} from '../../src/infra/database/DatabaseConnection';
import Registry from '../../src/infra/di/Registry';

let connection: DatabaseConnection;
let signup: Signup;
let getAccount: GetAccount;

beforeEach(() => {
	connection = new PgPromiseAdapter();
	Registry.getInstance().provide('databaseConnection', connection);
	const accountDAO = new AccountDAODatabase();
	Registry.getInstance().provide('accountDAO', accountDAO);
	Registry.getInstance().provide(
		'accountAssetDAO',
		new AccountAssetDAODatabase(),
	);
	Registry.getInstance().provide(
		'accountRepository',
		new AccountRepositoryDatabase(),
	);
	signup = new Signup();
	getAccount = new GetAccount();
});

test('Deve criar uma conta', async () => {
	const input = {
		name: 'John Doe',
		email: 'john.doe@email.com',
		document: '07830021066',
		password: 'mnbVCX1234',
	};

	const outputSignup = await signup.execute(input);
	const outputGetAccount = await getAccount.execute(outputSignup.accountId);
	expect(outputSignup.accountId).toBeDefined();
	expect(outputGetAccount.name).toBe(input.name);
	expect(outputGetAccount.email).toBe(input.email);
	expect(outputGetAccount.document).toBe(input.document);
	expect(outputGetAccount.password).toBe(input.password);
});

afterEach(async () => {
	await connection.close();
});
