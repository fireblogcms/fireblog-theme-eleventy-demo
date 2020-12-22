# Eleventy starter theme for fireblog

Eleventy is a great and simple static site generator: https://www.11ty.dev/

Fireblog ( https://fireblogcms.com/) is a new headless CMS dedicated to blogging, with a very simple but powerful writing interface. Try beta for free (one month trial): https://app.fireblogcms.com/ ).

## deploy

One of the easiest way to deploy your static blog is to use Netlify.

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/fireblogcms/fireblog-theme-seo-booster">
<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify">
</a>

## configure Netlify

**Build & deploy" > "Build settings"**

- Build command: `npm run build`
- Publish directory: `_site`

**build & deploy > Environment**

Create all environment variables listed in .env.template file in "Build & deploy" > "Environment" section.

**Build & deploy > Build hooks**

Create a "fireblog" hook. Copy paste this hook link in Fireblog, in "blog settings > Deploy webhook" section.

## dev: cetting started

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
