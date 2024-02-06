import { json } from '@sveltejs/kit';
import type { RequestHandler, Load, Actions } from '@sveltejs/kit';
import { db } from './api/utils';
import { v4 as uuidv4 } from 'uuid';
import { DOMAIN_NAME } from '$env/static/private';
import type { RequestEvent } from './api/$types';
import { fail } from '@sveltejs/kit';

export const load: Load = () => {
    const data = {load: true}
    return data;
};

const noContentErrorMessage = "No content";

export const actions = {
    saveMarkdown: async ({ request }: RequestEvent) => {
        try {
            const data = await request.formData();
            const content = data.get("content") as string;
            // validate markdown
            if (content.trim().length === 0) {
                throw new Error(noContentErrorMessage);
            };
            const markdownId = data.get("uuid") as string;
            // if id is not falsy (empty string) - already exists in db - update content
            if (markdownId) {
                await db.updateTable("urls.markdown")
                    .set({ content })
                    .where("uuid", "=", markdownId)
                    .execute();
                return json({}, { status: 204 });
            } else {
                const uuid = uuidv4();
                await db.insertInto("urls.markdown").values({
                    uuid,
                    content,
                }).execute();
                return { content: `${DOMAIN_NAME}/${uuid}` };
            }
        } catch (error: any) {
            if (error.message === noContentErrorMessage) {
                return fail(422, {
                    description: "Failed",
                    content: noContentErrorMessage,
                })
            }
        }
    },
};