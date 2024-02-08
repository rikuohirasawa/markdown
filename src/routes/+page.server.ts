import { fail, type Actions, redirect } from '@sveltejs/kit';
import { db } from './db/utils';
import { v4 as uuidv4 } from 'uuid';
import { DOMAIN_NAME } from '$env/static/private';

const noContentErrorMessage = "No content";

export const actions = {
    saveMarkdown: async ({ request }) => {
            const data = await request.formData();
            const content = data.get("content") as string;
            // validate markdown
            if (content.trim().length === 0) {
                return fail(422, {
                    description: "Failed",
                    content: noContentErrorMessage,
                })
            };
            const markdownId = data.get("uuid") as string;
            // if id is not falsy (empty string) - already exists in db - update content
            if (markdownId) {
                await db.updateTable("urls.markdown")
                    .set({ content })
                    .where("uuid", "=", markdownId)
                    .execute();
                return { content: "Update success" };
            } else {
                const uuid = uuidv4();
                await db.insertInto("urls.markdown").values({
                    uuid,
                    content,
                }).execute();
                return redirect(302, `${DOMAIN_NAME}/${uuid}`);
            }
    },
} satisfies Actions;