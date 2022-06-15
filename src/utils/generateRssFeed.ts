// import { Feed } from "feed";
// import fs from "fs";

// import { getBlogPostsData } from "@/utils/blog";

// const generateRssFeed = async () => {
//   const posts = await getBlogPostsData();
//   const siteURL = process.env.SITE_URL;
//   const date = new Date();
//   const author = {
//     name: "Sreetam Das",
//     email: "sreetam@sreetamdas.com",
//     link: "https://twitter.com/_SreetamDas",
//   };

//   const feed = new Feed({
//     title: "Sreetam Das' blog",
//     description: "",
//     id: siteURL,
//     link: siteURL,
//     image: `${siteURL}/logo.svg`,
//     favicon: `${siteURL}/favicon.png`,
//     copyright: `All rights reserved ${date.getFullYear()}, Sreetam Das`,
//     updated: date,
//     generator: "Feed for Node.js",
//     feedLinks: {
//       rss2: `${siteURL}/rss/feed.xml`,
//       json: `${siteURL}/rss/feed.json`,
//       atom: `${siteURL}/rss/atom.xml`,
//     },
//     author,
//   });

//   posts.forEach((post) => {
//     const url = `${siteURL}/blog/${post.slug}`;
//     feed.addItem({
//       title: post.title,
//       id: url,
//       link: url,
//       description: post.summary,
//       content: post.summary,
//       author: [author],
//       contributor: [author],
//       date: new Date(post.publishedAt),
//     });
//   });

//   fs.mkdirSync("./public/rss", { recursive: true });
//   fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
//   fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
//   fs.writeFileSync("./public/rss/feed.json", feed.json1());
// };
export default function r() {
  return 43;
}
