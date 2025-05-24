import { Kysely, sql } from 'kysely';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('markdown')
		.addColumn('uuid', 'uuid', (col) => col.primaryKey())
		.addColumn('content', 'text')
		.addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
		.addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
		.execute();

	await db.schema
		.createTable('reactions')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('emoji', 'text')
		.addColumn('count', 'integer')
		.addColumn('markdown_uuid', 'uuid', (col) => col.notNull().references('markdown.uuid'))
		.execute();
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('reactions').execute();
	await db.schema.dropTable('markdown').execute();
}
