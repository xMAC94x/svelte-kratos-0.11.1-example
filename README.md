# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


### Kratos Standalone config:

```
     environment:
       - DSN=sqlite:///var/lib/sqlite/db.sqlite?_fk=true
       - LOG_LEVEL=trace
       - SERVE_PUBLIC_CORS_ENABLED=true
       - SERVE_PUBLIC_CORS_DEBUG=true
       - SERVE_PUBLIC_CORS_ALLOW_CREDENTIALS=true
       - SERVE_PUBLIC_CORS_OPTIONS_PASSTHROUGH=true
       - SERVE_PUBLIC_CORS_ALLOWED_ORIGINS_0=http://127.0.0.1:4433
       - SERVE_PUBLIC_CORS_ALLOWED_ORIGINS_1=http://127.0.0.1:4455
       - SERVE_PUBLIC_CORS_ALLOWED_METHODS=POST,GET,PUT,PATCH,DELETE
       - SERVE_PUBLIC_CORS_ALLOWED_HEADERS=Authorization,Cookie,Content-Type
       - SERVE_PUBLIC_CORS_EXPOSED_HEADERS=Content-Type,Set-Cookie
       - SERVE_ADMIN_CORS_ENABLED=true
       - SERVE_ADMIN_CORS_DEBUG=true
       - SERVE_ADMIN_CORS_ALLOWED_ORIGINS=*
       - CORS_ALLOWED_ORIGINS=http://127.0.0.1:4455
```

```git
   kratos-selfservice-ui-node:
     ports:
-      - "4455:4455"
+      - "4456:4455"
```