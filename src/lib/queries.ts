import groq from 'groq';

const authorData = `{
    "authorName": title[$locale],
    "authorSlug": slug.current,
    "authorPicture": picture.asset -> url,
  }`;

const tagsData = `{
    "tagName": title[$locale],
    "tagSlug": slug.current
  }`;

const postData = `
  "postTitle": title[$locale],
  "postSlug": slug.current,
  "readingTime": round(length(pt::text(text[$locale])) / 5 / 180 ),
  "postImageUrl": coverImage.asset-> url,
  "postDate": _createdAt`;

export const getFeaturedPostsQuery = groq`*[_type == 'post' && featured == true] {
  ${postData},
  "author": author -> ${authorData},
  "tags": tags[] -> ${tagsData},
} [$skip...$limit] | order(_createdAt desc)`;

export const getPageContentQuery = groq`*[_type == 'page' && slug.current == $slug]{
  "pageTitle": title[$locale],
  "pagePicture": picture.asset -> url,
  "pageText": text[$locale]
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
  ${postData},
  "postText": text[$locale],
  "author": author -> ${authorData},
  "tags": tags[] -> ${tagsData},
  "relatedPosts": relatedPosts[] -> {
      ${postData},
      "author": author -> ${authorData},
      "tags": tags[] -> ${tagsData},
  }
}[0]`;

export const getAuthorAndRelatedPostsQuery = groq`*[_type == 'author' && slug.current ==  $slug]{
  "authorTitle": title[$locale],
  "authorSlug": slug.current,
  "authorBio": bio[$locale],
  "authorPicture": picture.asset -> url,
  "authorSocials": social,
  "authorPosts": *[_type == 'post' && references(^._id)] {
    ${postData},
    "author": author -> ${authorData},
    "tags": tags[] -> ${tagsData},
  } [$skip...$limit] | order(_createdAt desc)
}[0]`;

export const getTagAndRelatedPostsQuery = groq`*[_type == 'tag' &&  slug.current ==  $slug] {
  "tagTitle": title[$locale],
  "tagSlug": slug.current,
  "tagText": text[$locale],
  "tagPicture": picture.asset -> url,
  "sameTagPosts": *[_type == 'post' && references(^._id)] {
    ${postData},
    "author": author -> ${authorData},
    "tags": tags[] -> ${tagsData},
  } [$skip...$limit] | order(_createdAt desc)
}[0]`;
export const getPaginatedPostsQuery = groq`*[_type == 'post'] {
  ${postData},
  "author": author ->${authorData},
  "tags": tags[] -> ${tagsData},
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

export const getTotalPostForAlgoliaQuery = groq`[_type == 'post'] {
  "objectID": _id,
  "title": title[$locale],
  "slug": slug.current,
  "tags": tags[] -> {
    "tag": title[$locale],
  },
}`;
