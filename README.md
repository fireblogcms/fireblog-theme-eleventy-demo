# Eleventy disto theme for fireblog CMS.

Eleventy is a great and simple static site generator: https://www.11ty.dev/

Fireblog ( https://fireblogcms.com/) is a new headless CMS dedicated to blogging, with a very simple but powerful writing interface. Try beta for free (one month trial): https://app.fireblogcms.com/ ).

## deploy it now

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/fireblogcms/fireblog-theme-seo-booster?FIREBLOG_GRAPHQL_ENDPOINT=https://api.fireblogcms.com/graphql/blogset/5f5f73057ac2640018cb0fc7&FIREBLOG_BLOG_ID=5e0cc6b2c96420000444d376&SITE_URL=https://yoursite.netlify.app">
<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify">
</a>

## Getting started

Clone this repo.

```sh
git clone https://github.com/fireblogcms/fireblog-theme-seo-booster fireblog
```

Install dependencies

```sh
cd fireblog-theme-seo-booster
npm install
```

Set your environment variables by creating a `.env` file copied from the `.env.template` file

```sh
cp .env.template .env
```

Run locally in dev mode:

```sh
npm run dev
```

Now build your static blog :

```sh
npm run build
```

Your static files are located in `_site` directory:

```
# note: we are using serve package here to serve our static site: https://www.npmjs.com/package/serve
serve _site
```
