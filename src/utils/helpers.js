const fetch = require('node-fetch');

module.exports = {
  graphql,
  getBlog,
  getPosts,
  getTags,
  getFeaturedPosts,
  getPostsCount,
};

async function graphql({ query, variables }) {
  let response = await fetch(process.env.FIREBLOG_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  response = await response.json();
  if (response.errors) {
    console.log('GraphQL Error:');
    throw new Error(JSON.stringify(response.errors, 0, 2));
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
        }
      }
    }`,
  });
}

async function getPosts({ limit, skip, filter }) {
  const response = await graphql({
    variables: {
      limit,
      skip,
      filter,
    },
    query: `query getPosts($limit: Int!, $skip: Int, $filter: PostFilter) {
      posts(limit: $limit, skip: $skip, filter: $filter, sort: { publishedAt: desc }) {
        _id
        teaser
        slug
        title
        content
        tags {
          name
          slug
        }
        publishedAt
        updatedAt
        image(auto:[compress,format]) {
          url
        }
        imagePostPage:image(w:1920, h:1080, fit:crop, auto:[compress,format]) {
          url
        }
        imagePostList:image(w:400, h:220, fit:crop, crop:center, auto:[compress,format]) {
          url
        }
        imagePostRecent:image(w:100, h:100, fit:crop, auto:[compress,format]) {
          url
        }
      }
    }`,
  });
  return response.data.posts;
}

async function getPostsCount(filter) {
  const response = await graphql({
    variables: { filter },
    query: `
      query postsCount($filter: PostFilter) {
          postsCount(filter: $filter)
        }
    `,
  });
  return response.data.postsCount;
}

async function getTags(blogId) {
  const response = await graphql({
    variables: {
      blogId,
    },
    query: `query getTags($blogId: ID!) {
      tags(limit: 100, filter: { blog: { eq: $blogId } } ) {
        _id
        name
        slug
        description
        metaTitle
        metaDescription
      }
    }`,
  });
  return response.data.tags;
}

async function getFeaturedPosts(blogId) {
  const response = await graphql({
    variables: {
      filter: { featured: true, blog: { eq: blogId } },
    },
    query: `
      query featuredPosts($filter: PostFilter) {
          posts(limit: 4, filter: $filter) {
            _id
            slug
            title
            teaser
            publishedAt
            imagePostCarousel:image(w:1200, h:600, fit:crop, auto:[compress,format]) {
              url
            }
            imagePostCarouselThumbnail:image(w:100, h:100, fit:crop, auto:[compress,format]) {
              url
            }
          }
        }
    `,
  });
  return response.data.posts;
}
