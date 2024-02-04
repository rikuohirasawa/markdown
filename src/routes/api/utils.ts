import pg from "pg";
const { Pool } = pg;
import { 
    DOMAIN_NAME,
    PG_DATABASE,
    PG_HOST,
    PG_PORT,
    PG_USER,
    PG_TABLE
} from '$env/static/private';
import { type Generated, PostgresDialect, Kysely } from "kysely";

export const pool = new Pool({
    user: PG_USER,
    host: PG_HOST,
    max: 20,
    port: 5432,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    database: PG_DATABASE,
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
        user: PG_USER,
        host: PG_HOST,
        max: 20,
        port: 5432,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        database: PG_DATABASE,   
    })
});

export const db = new Kysely<Database>({
    dialect,
})