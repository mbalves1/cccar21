import express, { Response, Request } from 'express';
import crypto from 'crypto';
import pgp from 'pg-promise';
import { validateCpf } from './validateCpf';
import { validatePassword } from './validatePassword';
import { validateEmail } from './validateEmail';
import { validateName } from './validateName';
const app = express();
app.use(express.json());

// roando no container
const connection = pgp()('postgres://postgres:123456@db:5432/app');

// Roidando local
// const connection = pgp()('postgres://postgres:123456@localhost:5432/app');

app.post('/signup', async (req: Request, res: Response) => {
	const account = req.body;
	const accountId = crypto.randomUUID();
	// console.log('/signup', account);
	if (!validateName(account.name)) {
		res.status(422).json({
			message: 'Invalid name',
		});
		return;
	}
	if (!validateEmail(account.email)) {
		res.status(422).json({
			message: 'Invalid email',
		});
		return;
	}
	if (!validateCpf(account.document)) {
		res.status(422).json({
			message: 'Invalid document',
		});
		return;
	}
	if (!validatePassword(account.password)) {
		res.status(422).json({
			message: 'Invalid password',
		});
		return;
	}
	await connection.query(
		'insert into cccar.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)',
		[
			accountId,
			account.name,
			account.email,
			account.document,
			account.password,
		],
	);
	res.json({
		accountId,
	});
});

app.get('/accounts/:accountId', async (req: Request, res: Response) => {
	const accountId = req.params.accountId;
	console.log(`/accounts/${accountId}`);
	const [account] = await connection.query(
		'select * from cccar.account where account_id = $1',
		[accountId],
	);
	console.log(account);
	res.json(account);
});

app.listen(3000);
