# markdown editor

Text editor that parses markdown - which can be saved and shared with others.

## PostgreSQL

The application uses PostgreSQL as the db, one of the fastest ways to get this started is to run the db using the official docker image:

```bash
https://hub.docker.com/_/postgres

https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/
```

## SvelteKit

### Development

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Production

To create a production version of the app:

```bash
npm run build

# change origin to whatever domain/ip is attached to your server
ORIGIN=http://localhost:3000 npm start
```

You can preview the production build with `npm run preview`.

> At the moment the app is configured to use the [adapter-node](https://github.com/sveltejs/kit/tree/main/packages/adapter-node).
> For serverless environments, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
> If you run the app serverless - I imagine you will have to reconfigure the websocket to get live text editing
