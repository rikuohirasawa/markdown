import { error, type Load } from '@sveltejs/kit';
import { db } from '../api/utils';

export const ssr = true;
// export const csr = false;

export const load: Load = async ({ params }) => {
    const { slug } = params;
    if (slug) {
        const rows = await db.selectFrom("urls.markdown").selectAll().where("uuid", "=", slug).execute();
        const reactions = await db.selectFrom("urls.reactions").selectAll().where("markdown_id", "=", slug).execute();
        const data = {...rows[0], reactions: reactions.sort((a, b) => b.count - a.count)};
        return data;
    } else {
        return {
            content: null,
        }
    };
};