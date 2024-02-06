import { error, type Load } from '@sveltejs/kit';
import { db } from '../api/utils';
import type { RequestEvent } from './$types';

export const ssr = true;

export const load: Load = async ({ params }) => {
    const { slug } = params;
    if (slug) {
        const rows = await db.selectFrom("urls.markdown").selectAll().where("uuid", "=", slug).execute();
        if (!rows) {
            throw error(404);
        }
        const reactions = await db.selectFrom("urls.reactions").selectAll().where("markdown_id", "=", slug).execute();
        const data = {...rows[0], reactions: reactions.sort((a, b) => b.count - a.count)};
        return data;
    } else {
        return {
            content: null,
        }
    };
};

export const actions = {
    addReaction: async ( { request } : RequestEvent ) => {
        try {
            // check if reaction already exists - if so increment count - else insert new
            const data = await request.formData();
            const emoji = data.get("content") as string;
            const uuid = data.get("uuid") as string;
            const existingReaction = await db.selectFrom('urls.reactions')
                .selectAll()
                .where('emoji', '=', emoji)
                .where('markdown_id', '=', uuid)
                .executeTakeFirst();
            if (existingReaction) {
                await db.updateTable('urls.reactions')
                    .set({
                        count: existingReaction.count + 1,
                    })
                    .where('emoji', '=', emoji)
                    .where('markdown_id', '=', uuid)
                    .execute();
            } else {
                await db.insertInto("urls.reactions").values({
                    emoji,
                    count: 1,
                    markdown_id: uuid,
                }).execute();
            };

            const reactionsList = await db.selectFrom("urls.reactions")
                .selectAll()
                .where("markdown_id", "=", uuid)
                .execute();
            const sortedReactionsList = reactionsList.sort((a, b) => b.count - a.count);
            return { content: sortedReactionsList}
        } catch (error) {   
            console.log(error);
        }
    }
}