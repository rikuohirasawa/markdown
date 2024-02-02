import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// RPC endpoint
interface RPCparams {
    request: {
        action: string,
        params: any,
    },
}

export const POST: RequestHandler = async ({ request }) => {
    console.log("post");
    const { action, params } = await request.json();
    console.log(params);

    switch (action) {
        case "getGreeting": 
            return json({
                message: "greeting",
                status: 200,
            })
        default: 
            return json({
                message: "default",
                status: 404,
            })
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