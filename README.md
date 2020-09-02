# Eleventy starter theme for fireblog CMS.

Eleventy is a great and simple static site generator: https://www.11ty.dev/

Fireblog ( https://fireblogcms.com/) is a new headless CMS dedicated to blogging, with a very simple but powerful writing interface. Try beta for free (one month trial): https://app.fireblogcms.com/ ).

## getting started

Clone this repo.

```sh
git clone git@github.com:fireblogcms/eleventy-starter-fireblog.git fireblog-eleventy
```

Install dependencies

```sh
cd fireblog-eleventy
npm install
```

Set your environment variables by creating a `.env` file copied from the `.env.template` file

```sh
cp .env.template .env
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
