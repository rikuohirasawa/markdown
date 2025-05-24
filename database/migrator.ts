import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';

import { FileMigrationProvider, Kysely, Migrator } from 'kysely';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createMigrator = (db: Kysely<any>) =>
	new Migrator({
		db,
		provider: new FileMigrationProvider({
			fs,
			path,
			migrationFolder: path.join(__dirname, 'migrations')
		})
	});
