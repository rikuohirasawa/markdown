import { type Load } from "@sveltejs/kit";
import { marked } from "marked";
import { load as loadSlug } from "../+page.server";

export const ssr = true;
const escapeHTML = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

export const load: Load = async ( params ) => {
    const slugData = await loadSlug( params );
    if (slugData) {
        const { content, reactions, uuid } = slugData;
        return { content: marked.parse(escapeHTML(content)), reactions, uuid };
    }
};