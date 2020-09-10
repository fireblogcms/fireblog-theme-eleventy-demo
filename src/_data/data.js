const { getPosts, getBlog } = require("../utils/helpers");
require("dotenv").config();

// export for 11ty
module.exports = async() => {
  // Max number of posts to fetch per graphql query
  // this is *NOT* related to how many posts are displayed per page on homepage.
  // Please see pagination parameter in ./index.html file 
  // if you want to configure how many posts are displayed per page.
  const postsPerQuery = 50;

  // data will be available from Eleventy templates
  let data = {
    blog: null,
    posts: []
  };

  // get blog informations
  console.log(`Fetching blog informations from ${process.env.FIREBLOG_GRAPHQL_ENDPOINT} 🏃‍♀️`);
  const response = await getBlog(process.env.BLOG_ID);

  data.blog = response.data.blog;
  if (response.errors) {
    console.log('GraphQL error: ');
    throw new Error(JSON.stringify(response.errors, 0, 2));
  }
  
  console.log(`${data.blog.name} 📗`);

  // get ALL posts from fireblog
  let hasNextPage = true;
  let page = 1;
  while (hasNextPage) {
    console.log(`Fetching ${postsPerQuery} posts 🏃‍♀️`);
    const response = await getPosts({
      itemsPerPage: postsPerQuery,
      page,
      blogId: process.env.BLOG_ID
    });
    if (response.errors) {
      console.log('GraphQL error: ');
      throw new Error(JSON.stringify(response.errors, 0, 2));
    }
    const { pagination, items } = response.data.posts;
    data.posts = data.posts.concat(items);
    hasNextPage = pagination.hasNextPage;
    ++page;
  }

  return data;
}
