const fetch = require("node-fetch");

module.exports = {
  graphql,
  getBlog,
  getPosts
}

async function graphql({query, variables}) {
  let response = await fetch(process.env.FIREBLOG_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
  response = await response.json();
  if (response.errors) {
    console.log('❌ GraphQL Error: ', response.errors)
  }
  return response;
}

function getBlog() {
  return graphql({
    variables: {
      siteUrl: process.env.SITE_URL 
    },
    query: `query getBlog {
      blog {
        name
        description
        image {
          url
          alt
        }
      }
    }`
  })
}

async function getPosts({last, before }) {
  return graphql({
    variables: {
      last,
      before,
      siteUrl: process.env.SITE_URL 
    },
    query: `query getPosts($last: Int!, $before: Cursor) {
      posts(last: $last, before: $before) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            teaser
            slug
            title
            content
            publishedAt
            updatedAt
            image(auto:[compress,format]) {
              url
              alt
            }
            imagePostPage:image(w:1920, h:1080, fit:crop, auto:[compress,format]) {
              url
              alt
            }
            imagePostList:image(w:400, h:220, fit:crop, auto:[compress,format]) {
              url
              alt
            }
            imagePostRecent:image(w:1200, h:600, fit:crop, auto:[compress,format]) {
              url
              alt
            }
            author {
              name
              picture
            }
          }
        }
      }
    }`
  })
}
