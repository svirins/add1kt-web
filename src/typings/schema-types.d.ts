import type {
  SanityBlock,
  SanityImageAsset,
  SanityKeyed,
} from "sanity-codegen";

export type { SanityBlock, SanityImageAsset, SanityKeyed };

export type PostBase = {
  postTitle: string;
  postSlug: string;
  readingTime: number;
  postImageUrl: string;
  postDate: string;
  author: AuthorBase;
  tags: TagBase[];
};

export type Post = PostBase & {
  postText: PortableText;
  relatedPosts?: PostBase[];
};

export type AuthorBase = {
  authorName: string;
  authorSlug: string;
  authorPicture: string;
};

export type Author = AuthorBase & {
  authorBio: PortableText;
  authorSocials?: string[];
  authorPosts?: PostBase[];
};

export type TagBase = {
  tagName: string;
  tagSlug: string;
};

export type Tag = TagBase & {
  tagText: PortableText;
  tagPicture: string;
  sameTagPosts?: PostBase[];
};

export type Page = {
  pageTitle: string;
  pagePicture: string;
  pageText: PortableText;
};

export type PortableText = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
    }>
>;

export type PostsByAuthor = {
  authorName: string;
  authorSlug: string;
  relatedPostsCount: number;
};

export type PostsByTag = {
  tagName: string;
  tagSlug: string;
  relatedPostsCount: number;
};

export type Slug = {
  slug: string;
};
