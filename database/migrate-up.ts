import { createMigrator } from './migrator.js';
import { db } from './utils.js';

async function main() {
	console.log('migrating up...');
	const migrator = createMigrator(db);

	const { error, results } = await migrator.migrateToLatest();

	results?.forEach((it) => {
		if (it.status === 'Success') {
			console.log(`migration "${it.migrationName}" was executed successfully`);
		} else if (it.status === 'Error') {
			console.error(`failed to execute migration "${it.migrationName}"`);
		}
	});

	if (error) {
		console.error('failed to migrate');
		console.error(error);
		throw new Error('failed to migrate');
	}

	if (results == null || results.length == 0) {
		console.log('no migrations to run');
	}
	console.log('Migration completed successfully');
}

main();
