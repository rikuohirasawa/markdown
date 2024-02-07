import type { ActionResult } from "@sveltejs/kit";

export interface Reaction {
    id: number,
    emoji: string,
    count: number,
    markdown_id: string,
};

export type ActionResultExtended = ActionResult & { data: { content: string }};
