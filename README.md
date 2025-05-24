# markdown editor

Text editor that parses markdown - which can be saved and shared with others.

## Setting up a local environment

Install docker and a node package manager (defaults to pnpm)

From the root of the repo:

```bash
<PACKAGE_MANAGER> bootstrap <PACKAGE_MANAGER (optional - use this this if not using pnpm)>

# e.g. pnpm bootstrap pnpm
```

This will install dependencies and create a postgres container. The script is is idempotent.

## SvelteKit

### Development

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

### Production

To create a production version of the app:

```bash
pnpm run build

# change origin to whatever domain/ip is attached to your server
ORIGIN=http://localhost:3000 pnpm start
```

You can preview the production build with `pnpm run preview`.

> At the moment the app is configured to use the [adapter-node](https://github.com/sveltejs/kit/tree/main/packages/adapter-node).
> For serverless environments, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
> If you run the app serverless - I imagine you will have to reconfigure the websocket to get live text editing
