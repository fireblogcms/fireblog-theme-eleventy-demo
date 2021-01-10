const {
  getPosts,
  getBlog,
  getTags,
  getFeaturedPosts,
  graphql,
  getPostsCount,
} = require('../utils/helpers');
require('dotenv').config();

module.exports = async () => {
  // Max number of posts to fetch per graphql query
  // this is *NOT* related to how many posts are displayed per page on homepage.
  //
  // Please see pagination parameter in ./index.html file
  // if you want to configure how many posts are displayed per page.
  const postsPerQuery = 50;

  // data property will be available in all our Eleventy templates !
  let data = {
    blog: {},
    postsCount: 0,
    posts: [],
    tags: [],
    carouselPosts: [],
  };

  // common filter for posts and postsCount queries
  const postsFilter = { blog: { eq: process.env.BLOG_ID } };

  console.log(
    `Fetching informations from ${process.env.FIREBLOG_GRAPHQL_ENDPOINT}...`
  );

  // POST COUNT (to build pagination)
  console.log('fetching posts count');
  data.postsCount = getPostsCount(postsFilter);

  // BLOG
  console.log(`Fetching blog informations`);
  data.blog = await getBlog(process.env.BLOG_ID);

  // TAGS
  console.log(`Fetching blog tags`);
  data.tags = await getTags(process.env.BLOG_ID);

  // get ALL posts from fireblog
  let limit = postsPerQuery;
  let page = 1;
  let skip = 0;
  let totalPages = Math.ceil(data.postsCount / limit);
  while (page <= totalPages) {
    console.log(`Fetching ${postsPerQuery} posts of ${data.blog.name}...`);
    const posts = await getPosts({
      limit,
      skip,
      filter: postsFilter,
    });
    data.posts = data.posts.concat(posts);
    skip = page * limit;
    ++page;
  }

  // fetching featured posts
  console.log(`Fetching featured posts`);
  data.carouselPosts = getFeaturedPosts(process.env.BLOG_ID);

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
