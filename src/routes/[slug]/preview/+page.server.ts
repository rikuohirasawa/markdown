import { type Load } from "@sveltejs/kit";
import { marked } from "marked";
import { load as loadSlug } from "../+page.server";
import { JSDOM } from "jsdom";
import DOMPurify from 'dompurify';

export const ssr = true;

export const load: Load = async ( params ) => {
    const slugData = await loadSlug( params );
    if (slugData) {
        const { content, reactions, uuid } = slugData;
        // cleaning markdown before sending it to client
        const parsedMarkdown = await marked.parse(content);
        // emulating the browser environment (using JSDOM) to use DOMPurify methods
        const cleanedMarkdown = DOMPurify(new JSDOM('').window).sanitize(parsedMarkdown);
        return { content: cleanedMarkdown, reactions, uuid};
    }
};