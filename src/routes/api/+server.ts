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
                    content,
                    uuid,
                }).execute();
                return json({
                    status: 200,
                    url: `${DOMAIN_NAME}/${uuid}`,
                });
            case "selectURL":
                const { id } = params;
                await db.selectFrom("urls.markdown").select("uuid").where("uuid", "=", id)
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