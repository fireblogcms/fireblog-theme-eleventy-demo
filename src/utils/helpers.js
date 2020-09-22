const fetch = require("node-fetch");

module.exports = {
  graphql,
  getBlog,
  getPosts,
};

async function graphql({ query, variables }) {
  let response = await fetch(process.env.FIREBLOG_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  response = await response.json();
  if (response.errors) {
    console.log("❌ GraphQL Error: ", response.errors);
  }
  return response;
}

function getBlog(id) {
  return graphql({
    variables: {
      id,
      siteUrl: process.env.SITE_URL,
    },
    query: `query getBlog($id: ID!) {
      blog(filter: { _id: { eq: $id } }) {
        name
        description
        image {
          url
          alt
        }
      }
    }`,
  });
}

async function getPosts({ limit, skip, filter }) {
  return graphql({
    variables: {
      limit,
      skip,
      filter,
    },
    query: `query getPosts($limit: Int!, $skip: Int, $filter: PostFilter) {
      posts(limit: $limit, skip: $skip, filter: $filter, sort: { publishedAt: desc }) {
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
        imagePostList:image(w:400, h:220, fit:crop, crop:center, auto:[compress,format]) {
          url
          alt
        }
        imagePostCarousel:image(w:1200, h:600, fit:crop, auto:[compress,format]) {
          url
          alt
        }
        imagePostRecent:image(w:100, h:100, fit:crop, auto:[compress,format]) {
          url
          alt
        }
      }
    }`,
  });
}
