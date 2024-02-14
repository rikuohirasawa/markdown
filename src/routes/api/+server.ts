import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (request) => {
    return json({ message: "post" }, { status: 200 });
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


// const callApi = async () => {
// 	const response = await fetch("/api", {
// 		method: "POST",
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify({ })        
// 	});
// 	console.log(await response.json())
// 	// showModal = true;
// };</script>

// <button on:click={async ()=>{
// callApi()
// }}>click me</button>