/* eslint-disable import/no-extraneous-dependencies */
import dotenv from "dotenv";
import { Feed } from "feed";
import fs from "fs";

import { getPosts } from "./getPosts";

dotenv.config();

const generateRssFeed = async (locale: string) => {
  const posts = await getPosts(locale);
  const siteURL = process.env.SITE_URL;
  const date = new Date();
  // TODO: add email and link fields to Author datatodel, then implement post=>post.author in rss
  const author = {
    name: "Valeriy Grean",
    email: "vgrean@gmail.com",
    link: "https://twitter.com/_SreetamDas",
  };

  const feed = new Feed({
    title: "Valeriy Grean",
    description: "",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/logo.svg`,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Valeriy Grean`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });

  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.summary,
      content: post.summary,
      author: [author],
      contributor: [author],
      date: new Date(post.publishedAt),
    });
  });
  // eslint-disable-next-line no-console
  console.log("feed reporting", feed);
  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
};

generateRssFeed("ru");
