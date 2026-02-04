import express, { Response, Request } from 'express';
import crypto from 'crypto';
import pgp from 'pg-promise';
const app = express();
app.use(express.json());

const connection = pgp()('postgres://postgres:123456@localhost:5432/app');

app.post('/signup', async (req: Request, res: Response) => {
	console.log('/signup');
	const accountId = crypto.randomUUID();
	res.json({
		accountId,
	});
});

app.get('/accounts/:accountId', async (req: Request, res: Response) => {
	const accountId = req.params.accountId;
	console.log(`/accounts/${accountId}`);
	const [account] = await connection.query('select * from cccar.account', []);
	console.log(account);
	res.json({
		accountId,
	});
});

app.listen(3000);
