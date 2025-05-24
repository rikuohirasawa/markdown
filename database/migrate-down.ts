import { createMigrator } from './migrator.js';
import { db } from './utils.js';

async function main() {
	console.log('migrating down...');

	const migrator = createMigrator(db);

	const { error, results } = await migrator.migrateDown();

	results?.forEach((it) => {
		if (it.status === 'Success') {
			console.log(`rolling back "${it.migrationName}"`);
		} else if (it.status === 'Error') {
			console.error(`failed to rollback "${it.migrationName}"`);
		}
	});

	if (error) {
		console.error('failed to migrate down');
		console.error(error);
		throw new Error('failed to migrate down');
	}

	if (results == null || results.length == 0) {
		console.log('no migrations to rollback');
	}

	console.log('Migration down completed successfully');
}

main();
