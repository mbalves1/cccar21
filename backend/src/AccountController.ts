import AccountService from './AccountService';
import HttpServer from './HttpServer';
import { inject } from './Registry';
import Signup from './Signup';

// Interface Adapter
export default class AccountController {
	@inject('httpServer')
	httpServer!: HttpServer;
	@inject('accountService')
	accountService!: AccountService;
	@inject('signup')
	signup!: Signup;

	constructor() {
		this.httpServer.route('post', '/signup', async (params: any, body: any) => {
			console.log('body', body);

			const output = await this.signup.execute(body);
			return output;
		});

		this.httpServer.route(
			'get',
			'/accounts/:accountId',
			async (params: any, body: any) => {
				const output = await this.accountService.getAccount(params.accountId);
				return output;
			},
		);
	}
}
