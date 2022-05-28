// import apiRequest from '@/lib/api-request';
// import Config from '@/config/global-config';

// function getSkipValue(page) {
//   const skipMultiplier = page === 1 ? 0 : page - 1;
//     return skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;
// }

// export async function getFeaturedPosts(locale) {
//   const variables = {
//     locale: locale,
//     limit: Config.pagination.featuredPostsSize,
//     skip: 0
//   };
//   const query = groq`*[_type== 'post']`
//   const data = await apiRequest(query, variables);

//   return {
//     featuredPosts: ?? null,
//     total: ?? 0
//   };
// }

// export async function getPageContent(locale, slug) {
//   const variables = {
//     locale: locale,
//     slug: slug
//   };
// const query = groq`*[_type== 'page']`
//   const data = await apiRequest(query, variables);
//   return data ?? null;
// }

// export async function getAllPostSlugs() {
//   const query = groq`*[_type == 'post'] {"slug": slug.current}`
//   const data = await apiRequest(query);
//   return data ?? null;
// }

// export async function getAllAuthorSlugs() {
//   const query = groq`*[_type == 'author'] {"slug": slug.current}`
//   const data = await apiRequest(query);
//   return data ?? null;
// }

// export async function getAllTagSlugs() {
//   const query = groq`*[_type == 'tag'] { "slug": slug.current}`
//   const data = await apiRequest(query);
//   return data ?? null;
// }

// }
// export async function getPostAndRelatedPosts(slug, locale) {
//   const variables = {
//     locale: locale,
//     slug: slug,
//     skip: 0,
//     limit: Config.pagination.morePostsSize
//   };
//   const query = groq`*[_type== 'post']`
//   const data = await apiRequest(query, variables);

//   return {
//     post: ?? null,
//     relatedPosts:  ?? null
//   };
// }

// export async function getAuthorAndRelatedPosts(slug, locale) {
//   const variables = {
//     locale: locale,
//     slug: slug
//   };

//     const query = groq`*[_type== 'author']`
//     const data = await apiRequest(query, variables);

//   return {
//     author: ,
//     relatedPosts ?? null
//   };
// }

// export async function getTagAndRelatedPosts(slug, locale) {
//   const variables = {
//     locale: locale,
//     slug, slug
//   };
//     const query = groq`*[_type== 'tag']`
//     const data = await apiRequest(query, variables);

//   return {
//     tag: ,
//     relatedPosts ?? null
//   };
// }



// export async function getPaginatedPosts(page, locale) {


//   const variables = {
//     locale: locale,
//     limit: Config.pagination.morePostsSize,
//     skip: getSkipValue(page)
//   };
//   const data = await apiRequest(query, variables);
//   return data?.postCollection?.items ?? null;
// }

// export async function GetCategories(locale) {

//   const variables = {
//     locale: locale
//   };
//   const authors = await apiRequest(queryAuthors, variables);
//   const tags = await apiRequest(queryTags, variables);

//   return {
//     authors:  ?? null,
//     tags: ?? null
//   };
// }


// export async function getTotalPostsNumber() {


//   return {
// total
//   };
// }
