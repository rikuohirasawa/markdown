import pg from "pg";
const { Pool } = pg;

import { type Generated, PostgresDialect, Kysely } from "kysely";

export const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    max: 20,
    port: 5432,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    database: process.env.PG_TABLE,
});

// kysely types

export interface MarkdownTable {
    id: Generated<number>,
    content: string,
    uuid: string,
};

export interface Database {
    "urls.markdown": MarkdownTable,
};

const dialect = new PostgresDialect({
    pool: new pg.Pool({
        user: "rikuo",
        host: "localhost",
        max: 20,
        port: 5432,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        database: "markdown_editor"   
    })
});

export const db = new Kysely<Database>({
    dialect,
})