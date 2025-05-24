import { error, type Load } from '@sveltejs/kit';
import { db } from '../../../lib/database/utils';

export const ssr = true;

export const load: Load = async ({ params }) => {
	const { slug } = params;
	if (!slug || slug.length !== 36) {
		throw error(404, { message: 'Not found' });
	}
	const rows = await db.selectFrom('markdown').selectAll().where('uuid', '=', slug).execute();
	if (!rows) {
		throw error(404, { message: 'Not found' });
	}
	const reactions = await db
		.selectFrom('reactions')
		.selectAll()
		.where('markdown_uuid', '=', slug)
		.execute();
	const data = { ...rows[0], reactions: reactions.sort((a, b) => b.count - a.count) };
	return data;
};
