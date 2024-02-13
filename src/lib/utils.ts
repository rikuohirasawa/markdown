import type { ActionResult } from "@sveltejs/kit";

export interface Reaction {
    id?: number,
    emoji: string,
    count: number,
    markdown_id: string,
    clicked?: boolean,
};

export interface SelectedReaction {
    feedbackId?: string;
    emoji: string;
}

export type ActionResultExtended = ActionResult & 
    { 
    data: { content: string | Reaction[]}, 
    location? : string
    };

const defaultEmojis = ["😀", "😍", "🤩", "😎", "🤯", "🤔"];

export const getReactionsArray = (uuid: string, reactions: Reaction[]) => {
    if (reactions.length > 6) {
        return reactions.slice(0, 6);
    };
    const defaultArray: Reaction[] = defaultEmojis.map(emoji => { 
        return { emoji, count: 0, markdown_id: uuid };
    });
    if (reactions.length <= 6 && reactions.length > 0) {
        const arr = [ ...defaultArray ];
        reactions.forEach((reaction => {
            const index = arr.findIndex(defaultReaction => defaultReaction.emoji === reaction.emoji.trim());
            if (index !== -1) {
                // replace default reaction with actual reaction data
                arr[index] = reaction;
            } else {
                arr.push(reaction);
            }
        }));
        return arr.sort((a, b) => b.count - a.count).slice(0, 6);
    };
    return defaultArray;
};

import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";    

// escape html fx - https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
const escapeHTML = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

export const parseMarkdown = async (md: string, htmlMode: boolean) => {
    let compiledMarkdown: string;
    let parsedMarkdown = await marked.parse(md);
    if (htmlMode) {
        // if html is enabled sanitize the HTML
        compiledMarkdown = DOMPurify.sanitize(parsedMarkdown);
    } else {
        // else - use regex to escape HTML tags and render plain text while still rendering markdown
        compiledMarkdown = await marked.parse(escapeHTML(md));
    }
    return compiledMarkdown;
};