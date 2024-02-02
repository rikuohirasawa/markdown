import { json } from '@sveltejs/kit';

export function GET() {
	const message = "Hello from the API"
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