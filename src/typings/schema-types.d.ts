import type {
  SanityBlock,
  SanityImageAsset,
  SanityKeyed,
} from 'sanity-codegen';

export type { SanityBlock, SanityImageAsset, SanityKeyed };

export type PostShort = {
  postTitle: string;
  postSlug: string;
  readingTime: number;
  postImageUrl: string;
  postDate: string;
  author: AuthorShort;
  tags: TagShort[];
};

export type PostExtra = {
  postText: PortableText;
  relatedPosts?: PostShort[];
};

export type Post = PostShort & PostExtra;

export type AuthorShort = {
  authorName: string;
  authorSlug: string;
  authorPicture: string;
};

export type AuthorExtra = {
  authorBio: PortableText;
  authorSocials?: string[];
  authorPosts?: PostShort[];
};

export type Author = AuthorShort & AuthorExtra;

export type TagShort = {
  tagName: string;
  tagSlug: string;
};

export type TagExtra = {
  tagText: PortableText;
  tagPicture: string;
  sameTagPosts?: PostShort[];
};

export type Tag = TagShort & TagExtra;

export type Page = {
  pageTitle: string;
  pagePicture: string;
  pageText: PortableText;
};

export type PortableText = Array<
| SanityKeyed<SanityBlock>
| SanityKeyed<
{
  _type: 'image';
  asset: SanityReference<SanityImageAsset>;
}
>
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
