import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { handler } from '../build/handler.js'
import pg from "pg";
import { PostgresDialect, Kysely } from "kysely";
import 'dotenv/config';

const {
  PG_DATABASE,
  PG_HOST,
  PG_USER,
  PG_PASSWORD,
} = process.env;

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
  dialect,
});

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
  socket.on("joinRoom", (uuid) => {
    socket.join(uuid);
    console.log(`Socket ${socket.id} joined room ${uuid}`);
  });

  socket.on("updateMarkdown", async (data) => {
    const { uuid, content } = data;
    await db.updateTable("urls.markdown")
      .set({ content })
      .where("uuid", "=", uuid)
      .execute();
    
    const updated = await db.selectFrom("urls.markdown").selectAll().where("uuid", "=", uuid).execute();

    io.to(uuid).emit('markdownUpdated', updated[0]);
  })

});
io.on('disconnect', () => {
  console.log('user disconnected');
});

app.use(handler);

server.listen(port);