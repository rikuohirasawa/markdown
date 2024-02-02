import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { db } from './utils';
import { v4 as uuidv4 } from 'uuid';

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
                    message: uuid,
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



        // console.log(insert);
        // const query = db.selectFrom("urls.markdown").selectAll();
        // const data = await query.execute();
        // console.log(data)
        // const db = await pool.query("SELECT * FROM urls.markdown");
        // const insert = await pool.query("INSERT INTO")
        // console.log(db.rows)

    } catch (error) {
        console.error(error);
        return json({
            status: 500,
            message: "Server Error"
        });
    }

    console.log("post");
    // console.log(params);

    // switch (action) {
    //     case "getGreeting": 
    //         return json({
    //             message: "greeting",
    //             status: 200,
    //         })
    //     default: 
    //         return json({
    //             message: "default",
    //             status: 404,
    //         })
    // }
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