import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { handler } from '../build/handler.js';
import pg from 'pg';
import { PostgresDialect, Kysely } from 'kysely';
import dotenv from 'dotenv';

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
	console.log('Loading local credentials from .env.local');
	dotenv.config({ path: '.env.local' });
}

const { PG_DATABASE, PG_HOST, PG_USER, PG_PASSWORD } = process.env;

console.log('Database config:', { PG_HOST, PG_USER, PG_DATABASE });

const dialect = new PostgresDialect({
	pool: new pg.Pool({
		user: PG_USER,
		host: PG_HOST,
		max: 20,
		port: 5432,
		idleTimeoutMillis: 30000,
		connectionTimeoutMillis: 2000,
		database: PG_DATABASE,
		password: PG_PASSWORD
	})
});

const db = new Kysely({
	dialect
});

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
	console.log('User connected:', socket.id);

	socket.on('joinRoom', (uuid) => {
		socket.join(uuid);
		console.log(`Socket ${socket.id} joined room ${uuid}`);
	});

	socket.on('updateMarkdown', async (data) => {
		const { uuid, content } = data;
		await db.updateTable('markdown').set({ content }).where('uuid', '=', uuid).execute();

		const updated = await db.selectFrom('markdown').selectAll().where('uuid', '=', uuid).execute();

		io.to(uuid).emit('markdownUpdated', updated[0]);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
	});
});

app.use(handler);

server.listen(port);
