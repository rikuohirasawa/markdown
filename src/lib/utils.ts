import type { ActionResult } from "@sveltejs/kit";

export interface Reaction {
    id?: number,
    emoji: string,
    count: number,
    markdown_id: string,
};

export interface SelectedReaction {
    feedbackId?: string;
    emoji: string;
}

export type ActionResultExtended = ActionResult & 
    { 
    data: { content: string }, 
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

