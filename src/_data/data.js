const { getPosts, getBlog } = require("../utils/helpers");
require("dotenv").config();

// export for 11ty
module.exports = async() => {
  // Max number of posts to fetch per graphql query
  // this is *NOT* related to how many posts are displayed per page on homepage.
  // Please see pagination parameter in ./index.html file 
  // if you want to configure how many posts are displayed per page.
  const postsPerQuery = 100;

  // data will be available from Eleventy templates
  let data = {
    blog: null,
    posts: []
  };

  // get blog informations
  console.log(`Fetching blog informations from ${process.env.FIREBLOG_GRAPHQL_ENDPOINT} 🏃‍♀️`)
  const response = await getBlog();

  data.blog = response.data.blog;
  if (response.errors) {
    console.log('GraphQL error: ')
    throw new Error(JSON.stringify(response.errors, 0, 2))
  }
  
  console.log(`${data.blog.name} 📗`)

  // get ALL posts from fireblog
  let hasNextPage = true;
  let before = "";
  while (hasNextPage) {
    console.log(`Fetching ${postsPerQuery} posts 🏃‍♀️`)
    const response = await getPosts({ last: postsPerQuery, before })
    if (response.errors) {
      console.log('GraphQL error: ')
      throw new Error(JSON.stringify(response.errors, 0, 2))
    }
    const { pageInfo, edges } = response.data.posts;
    const posts = edges.map(edge => edge.node)
    data.posts = data.posts.concat(posts);
    hasNextPage = pageInfo.hasNextPage;
    before = pageInfo.endCursor;
  }
  return data;
}
