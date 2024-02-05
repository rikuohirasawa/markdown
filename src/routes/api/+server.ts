import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { db } from './utils';
import { v4 as uuidv4 } from 'uuid';
import { DOMAIN_NAME } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { action, params } = await request.json();
        switch(action) {
            case "insertURL": 
                const { content } = params;
                const uuid = uuidv4();
                await db.insertInto("urls.markdown").values({
                    uuid,
                    content,
                }).execute();
                return json({
                    status: 200,
                    message: "Successfully saved work",
                    content: `${DOMAIN_NAME}/${uuid}`,
                });
            case "insertReaction":
                const { emoji, count, markdown_id } = params;
                // check if reaction already exists - if so increment count - else insert new
                const existingReaction = await db.selectFrom('urls.reactions')
                    .selectAll()
                    .where('emoji', '=', emoji)
                    .where('markdown_id', '=', markdown_id)
                    .executeTakeFirst();
                if (existingReaction) {
                    await db.updateTable('urls.reactions')
                        .set({
                            count: existingReaction.count + 1,
                        })
                        .where('emoji', '=', emoji)
                        .where('markdown_id', '=', markdown_id)
                        .execute();
                } else {
                    await db.insertInto("urls.reactions").values({
                        emoji,
                        count: 1,
                        markdown_id,
                    }).execute();
                }
                const reactionsList = await db.selectFrom("urls.reactions")
                    .selectAll()
                    .where("markdown_id", "=", markdown_id)
                    .execute();
                const sortedReactionsList = reactionsList.sort((a, b) => b.count - a.count);
                return json({
                    status: 200,
                    message: "Successfully added reaction",
                    content: sortedReactionsList,
                });
            default: 
                return json({
                    status: 404,
                    message: "Endpoint not found",
                });
        }
    } catch (error) {
        console.error(error);
        return json({
            status: 500,
            message: "Server Error"
        });
    }
};

export function GET() {
	const message = "Hello from the RPC"
	return json({message});
	// const number = Math.floor(Math.random() * 6) + 1;

    // let params: BodyInit = {
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	}
    // }
	// return new Response(number,{
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	}
	// });
}