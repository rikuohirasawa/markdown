import pg from 'pg';
import { type Generated, PostgresDialect, Kysely } from 'kysely';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
	console.log('Loading local credentials from .env.local');
	dotenv.config({ path: '.env.local' });
}

const { PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE } = process.env;

export interface MarkdownTable {
	uuid: string;
	content: string;
}

export interface ReactionsTable {
	id: Generated<number>;
	emoji: string;
	count: number;
	markdown_uuid: string;
}

export interface Database {
	markdown: MarkdownTable;
	reactions: ReactionsTable;
}

export const dialect = new PostgresDialect({
	pool: new pg.Pool({
		user: PG_USER,
		host: PG_HOST,
		max: 10,
		port: 5432,
		database: PG_DATABASE,
		password: PG_PASSWORD
	})
});

export const db = new Kysely<Database>({
	dialect
});
