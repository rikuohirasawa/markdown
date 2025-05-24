import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type ViteDevServer } from 'vite';
import { Server } from 'socket.io';
import { db } from './src/lib/database/utils';
import 'dotenv/config';
const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);

		io.on('connection', (socket) => {
			console.log('User connected');
			socket.on('joinRoom', (uuid: string) => {
				socket.join(uuid);
				console.log(`Socket ${socket.id} joined room ${uuid}`);
			});

			socket.on('updateMarkdown', async (data: { uuid: string; content: string }) => {
				const { uuid, content } = data;
				await db.updateTable('markdown').set({ content }).where('uuid', '=', uuid).execute();

				const updated = await db
					.selectFrom('markdown')
					.selectAll()
					.where('uuid', '=', uuid)
					.execute();

				io.to(uuid).emit('markdownUpdated', updated[0]);
			});
		});

		io.on('disconnect', () => {
			console.log('user disconnected');
		});
	}
};

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
});
