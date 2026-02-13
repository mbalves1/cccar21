import crypto from 'crypto';
import pgp from 'pg-promise';
import { validateCpf } from './validateCpf';
import { validatePassword } from './validatePassword';
import { validateEmail } from './validateEmail';
import { validateName } from './validateName';

// roando no container
const connection = pgp()('postgres://postgres:123456@db:5432/app');

// Roidando local
// const connection = pgp()('postgres://postgres:123456@localhost:5432/app');

export const signup = async (account: any) => {
	const accountId = crypto.randomUUID();

	if (!validateName(account.name)) throw new Error('Invalid name');
	if (!validateEmail(account.email)) throw new Error('Invalid email');
	if (!validateCpf(account.document)) throw new Error('Invalid document');
	if (!validatePassword(account.password)) throw new Error('Invalid password');
	await connection.query(
		'insert into cccar.account (account_id, name, email, document, password) values ($1, $2, $3, $4, $5)',
		[
			accountId,
			account.name,
			account.email,
			account.document,
			account.password,
			account.message,
		],
	);
	return {
		accountId,
	};
};

export const getAccount = async (accountId: any) => {
	const [account] = await connection.query(
		'select * from cccar.account where account_id = $1',
		[accountId],
	);
	console.log(account);
	return account;
};
