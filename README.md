# Eleventy starter theme for fireblog

Eleventy is a great and simple static site generator: https://www.11ty.dev/

Fireblog ( https://fireblogcms.com/) is a new headless CMS dedicated to blogging, with a very simple but powerful writing interface. Try beta for free (one month trial): https://app.fireblogcms.com/ ).

## deploy

The easiest way to deploy your static blog is to use Netlify: just click on this button and follow the instructions!

<a href='https://app.netlify.com/start/deploy?repository=https://github.com/fireblogcms/fireblog-theme-seo-booster#FIREBLOG_GRAPHQL_ENDPOINT=https://api.fireblogcms.com/graphql/blogset/5f5f73057ac2640018cb0fc7&BLOG_ID=5e0cc6b2c96420000444d376&SITE_URL=https://yoursite.netlify.app'>
<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify">
</a>

## configure Netlify build hook

Your blog need to be rebuild when fireblog content changes. Fortunately, Fireblog can send an HTTP request to Netlify to trigger a rebuild!

### Create a new "build hook" on Netlify

Deploy settings > build & deploy: create a new "fireblog" build hook

### Trigger this build hook on content change with Fireblog

in your blog settings > Deploy webhook, copy paste the build hook created on Netlify

## dev: getting started

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
