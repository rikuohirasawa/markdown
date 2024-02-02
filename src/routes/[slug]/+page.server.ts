import { error, type Load } from '@sveltejs/kit';
import { db } from '../api/utils';

export const ssr = true;
// export const csr = false;

// /** @type {import('./$types').EntryGenerator} */
// export function entries() {
// 	return [
// 		{ slug: 'hello-world' },
// 		{ slug: 'another-blog-post' }
// 	];
// }

// export const prerender = true;

export const load: Load = async ({ params }) => {
    const { slug } = params;
    if (slug) {
        const rows = await db.selectFrom("urls.markdown").selectAll().where("uuid", "=", slug).execute();
        const data = rows[0]
        return data;
    } else {
        return {
            content: null,
        }
    };
};