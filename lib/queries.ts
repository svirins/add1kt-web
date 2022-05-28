import { groq } from 'next-sanity';

export const getFeaturedPostsQuery = groq`*[_type == 'post' && featured == true] {
  "postTitle": title[$locale],
  "postSlug": slug.current,
  "author": author -> {
    "authorName": title[$locale],
    "authorSlug": slug.current
  },
  "tags": tags[] -> {
    "tagName": title[$locale],
    "tagSlug": slug.current
  },
  "postImageUrl": coverImage.asset-> url,
  "postDate": _createdAt
} [$skip...$limit] | order(_createdAt desc)`;

export const getPageContentQuery = groq`*[_type == 'page' && slug.current == $slug]{
  "title": title[$locale],
  "text": text[$locale]
}[0]`;

export const getAllPostSlugsQuery = groq`*[_type == 'post'] {
  "slug": slug.current,
}`;

export const getAllAuthorSlugsQuery = groq`*[_type == 'author'] {
  "slug": slug.current,
}`;

export const getAllTagSlugsQuery = groq`*[_type == 'tag'] {
  "slug": slug.current,
}`;

export const getPostAndRelatedPostsQuery = groq`*[_type == 'post'  && slug.current == $slug] {
  "postTitle": title[$locale],
  "postSlug": slug.current,
  "author": author -> {
    "authorName": title[$locale],
    "authorSlug": slug.current
  },
  "tags": tags[] -> {
    "tagName": title[$locale],
    "tagSlug": slug.current
  },
  "postImageUrl": coverImage.asset-> url,
  "postDate": _createdAt,
  "postText": text[$locale],
  "relatedPosts": relatedPosts[] -> {
      "postTitle": title[$locale],
      "postSlug": slug.current,
      "postDate": _createdAt,
      "author": author -> {
        "authorName": title[$locale],
        "authorSlug": slug.current
      },
      "tags": tags[] -> {
        "tagName": title[$locale],
        "tagSlug": slug.current
      },
  }
}[0]`;

export const getAuthorAndRelatedPostsQuery = groq`*[_type == 'author' && slug.current ==  $slug]{
  "authorTitle": title[$locale],
  "authorSlug": slug.current,
  "authorBio": bio[$locale],
  "authorPicture": picture.asset -> url,
  "authorSocials": social,
  "authorPosts": *[_type == 'post' && references(^._id)] {
    "postTitle": title[$locale],
    "postSlug": slug.current,
    "author": author -> {
      "authorName": title[$locale],
      "authorSlug": slug.current
      },
      "tags": tags[] -> {
        "tagName": title[$locale],
        "tagSlug": slug.current
      },
      "postImageUrl": coverImage.asset-> url,
      "postDate": _createdAt
  } [$skip...$limit] | order(_createdAt desc)
}[0]`;

export const getTagAndRelatedPostsQuery = groq`*[_type == 'tag' &&  slug.current ==  $slug] {
  "tagTitle": title[$locale],
  "tagSlug": slug.current,
  "tagText": text[$locale],
  "sameTagPosts": *[_type == 'post' && references(^._id)] {
    "postTitle": title[$locale],
    "postSlug": slug.current,
    "author": author -> {
      "authorName": title[$locale],
      "authorSlug": slug.current
      },
      "tags": tags[] -> {
        "tagName": title[$locale],
        "tagSlug": slug.current
      },
      "postImageUrl": coverImage.asset-> url,
      "postDate": _createdAt
  } [$skip...$limit] | order(_createdAt desc)
}[0]`;
export const getPaginatedPostsQuery = groq`*[_type == 'post'] {
  "postTitle": title[$locale],
  "postSlug": slug.current,
  "author": author -> {
    "authorName": title[$locale],
    "authorSlug": slug.current
  },
  "tags": tags[] -> {
    "tagName": title[$locale],
    "tagSlug": slug.current
  },
  "postImageUrl": coverImage.asset-> url,
  "postDate": _createdAt
} [$skip...$limit] | order(_createdAt desc)`;

export const getTagsAndRelatedPostsCountQuery = groq`*[_type=="tag"] {
  "tagTitle": title[$locale],
  "tagSlug": slug.current,
  "relatedPostsCount": count(*[_type=='post' && references(^._id)])
}`;

export const getAuthorsAndRelatedPostsCountQuery = groq`*[_type=="author"] {
  "authorTitle": title[$locale],
  "authorSlug": slug.current,
  "relatedPostsCount": count(*[_type=='post' && references(^._id)])
}`;

export const getTotalPostsNumberQuery = groq`count(*[_type == 'post'])`;
