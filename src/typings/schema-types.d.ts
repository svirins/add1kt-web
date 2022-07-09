import type { SanityBlock, SanityImageAsset, SanityKeyed } from "sanity-codegen";

export type { SanityBlock, SanityImageAsset, SanityKeyed };

export type TPostBase = {
  postTitle: string;
  postSlug: string;
  readingTime: number;
  postImageUrl: string;
  postDate: string;
  author: TAuthorBase;
  tags: TTagBase[];
  _updatedAt;
  _createdAt;
};

export type TPost = TPostBase & {
  postText: TPortableText;
  relatedPosts?: TPostBase[];
};

export type TAuthorBase = {
  authorName: string;
  authorSlug: string;
  authorPicture: string;
};

export type TAuthor = TAuthorBase & {
  authorBio: TPortableText;
  authorSocials?: string[];
  authorPosts?: TPostBase[];
  authorTwitter: string;
  authorEmail: string;
};

export type TTagBase = {
  tagName: string;
  tagSlug: string;
};

export type TTag = TTagBase & {
  tagText: TPortableText;
  tagPicture: string;
  sameTagPosts?: TPostBase[];
};

export type TPage = {
  pageTitle: string;
  pagePicture: string;
  pageText: TPortableText;
};

export type TPortableText = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
    }>
>;

export type TPostsByAuthor = {
  authorName: string;
  authorSlug: string;
  relatedPostsCount: number;
};

export type TPostsByTag = {
  tagName: string;
  tagSlug: string;
  relatedPostsCount: number;
};

export type TSlug = {
  slug: string;
};
