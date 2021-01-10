const { getPosts, getBlog, getTags, graphql } = require('../utils/helpers');
require('dotenv').config();

// export for 11ty
module.exports = async () => {
  // Max number of posts to fetch per graphql query
  // this is *NOT* related to how many posts are displayed per page on homepage.
  //
  // Please see pagination parameter in ./index.html file
  // if you want to configure how many posts are displayed per page.
  const postsPerQuery = 50;

  // data property will be available in all our Eleventy templates
  let data = {
    blog: null,
    posts: [],
    tags: [],
    carouselPosts: [],
  };

  const postsFilter = { blog: { eq: process.env.BLOG_ID } };

  const countResponse = await graphql({
    query: `
      query postsCount($filter: PostFilter) {
          postsCount(filter: $filter)
        }
    `,
    variables: { filter: postsFilter },
  });
  const postsCount = countResponse.data.postsCount;

  // get blog informations
  console.log(
    `Fetching blog informations from ${process.env.FIREBLOG_GRAPHQL_ENDPOINT}...`
  );
  const response = await getBlog(process.env.BLOG_ID);
  data.blog = response.data.blog;

  // get all blog tags
  console.log(
    `Fetching tags informations from ${process.env.FIREBLOG_GRAPHQL_ENDPOINT}...`
  );
  const tagResponse = await getTags(process.env.BLOG_ID);
  data.tags = tagResponse.data.tags;

  // get ALL posts from fireblog
  let limit = postsPerQuery;
  let page = 1;
  let skip = 0;
  let totalPages = Math.ceil(postsCount / limit);
  while (page <= totalPages) {
    console.log(`Fetching ${postsPerQuery} posts of ${data.blog.name}...`);
    const response = await getPosts({
      limit,
      skip,
      filter: postsFilter,
    });

    if (response.errors) {
      console.log('GraphQL error: ');
      throw new Error(JSON.stringify(response.errors, 0, 2));
    }

    data.posts = data.posts.concat(response.data.posts);

    skip = page * limit;
    ++page;
  }

  // fetching featured posts
  console.log(`Fetching featured posts`);
  const featuredPosts = await graphql({
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
    variables: {
      filter: { featured: true, blog: { eq: process.env.BLOG_ID } },
    },
  });
  data.carouselPosts = featuredPosts.data.posts;

  // filter only tags with posts
  data.tags = data.tags.reduce((accumulator, tag) => {
    const posts = data.posts.filter(
      post => !!post.tags.find(t => t.slug === tag.slug)
    );
    if (posts.length > 0) {
      return [...accumulator, { ...tag, posts }];
    }
    return accumulator;
  }, []);

  return data;
};
