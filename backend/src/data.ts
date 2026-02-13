import pgp from 'pg-promise';

// roando no container

// Roidando local
// const connection = pgp()('postgres://postgres:123456@localhost:5432/app');

export const saveAccount = async (account: any) => {
	const connection = pgp()('postgres://postgres:123456@db:5432/app');
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
	await connection.$pool.end();
};

export const getAccountById = async (accountId: any) => {
	const connection = pgp()('postgres://postgres:123456@db:5432/app');
	const [account] = await connection.query(
		'select * from cccar.account where account_id = $1',
		[accountId],
	);
	await connection.$pool.end();
	return account;
};
