const { getPosts, getBlog, graphql } = require('../utils/helpers');
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
    `Fetching blog informations from ${process.env.FIREBLOG_GRAPHQL_ENDPOINT} 🏃‍♀️`
  );
  const response = await getBlog(process.env.BLOG_ID);

  data.blog = response.data.blog;
  if (response.errors) {
    console.log('GraphQL error: ');
    throw new Error(JSON.stringify(response.errors, 0, 2));
  }

  console.log(`${data.blog.name} 📗`);

  // get ALL posts from fireblog
  let limit = postsPerQuery;
  let page = 1;
  let skip = 0;
  let totalPages = Math.ceil(postsCount / limit);
  while (page <= totalPages) {
    console.log(`Fetching ${postsPerQuery} posts 🏃‍♀️`);
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
  return data;
};
