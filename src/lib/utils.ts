import toast from "svelte-french-toast";

export interface Reaction {
    id: number,
    emoji: string,
    count: number,
    markdown_id: string,
};

export const apiInstance = async ( action: string, params: { [key: string]: any } ) => {
    try {
        const response = await fetch("/api", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, params })        
        });
        const data = await response.json();
        return data;
    } catch (error) {
        toast.error("Request failed");
    }
};

export const defaultEmojis = ["😃", "😍", "👀", "🤮"];

