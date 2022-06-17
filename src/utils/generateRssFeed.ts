/* eslint-disable import/no-extraneous-dependencies */
import dotenv from "dotenv";
import { Feed } from "feed";
import fs from "fs";

// import { truncate } from "./contentUtils";
import { getPosts } from "./getPosts";
import { AUTHOR, LOCALIZED_RSS_DATA } from "./global.config";

dotenv.config();

const generateRssFeed = async (locale: string) => {
  const posts = await getPosts(locale);
  const siteURL =
    locale === "ru" ? process.env.SITE_URL : process.env.SITE_ALT_URL;
  const date = new Date();
  const { siteName, siteDescription } = LOCALIZED_RSS_DATA.find(
    (i) => i.locale === locale
  );
  const feed = new Feed({
    title: siteName,
    description: siteDescription,
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/logo.webp`,
    language: locale,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Valeriy Grean`,
    updated: date,
    generator: "Feed for Node.js with some fancy extras",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author: AUTHOR,
  });
  posts.forEach((post) => {
    const link = `${siteURL}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: post.objectID,
      link,
      image: post.image,
      // description: truncate(post.text.replace(/[\r\n]/gm, ""), 256),
      author: [post.author],
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
