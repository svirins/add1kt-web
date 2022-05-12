import { gql } from 'graphql-request';

export const POST_DATA = gql`
  fragment PostData on Post {
    slug
    title
    coverImage {
      url
      width
      height
    }
    featured
    body {
      json
      links {
        assets {
          block {
            sys {
              id
            }
            url
            description
            width
            height
          }
        }
      }
    }
    authorCollection {
      items {
        name
        slug
        picture {
          url
          width
          height
        }
      }
    }
    tagsCollection {
      items {
        title
        slug
      }
    }
    sys {
      id
      publishedAt
      firstPublishedAt
    }
    relatedPostsCollection {
      items {
        slug
      }
    }
  }
`;

export const HOMEPAGE_DATA = gql`
  fragment HomepageData on Homepage {
    title
    body {
      json
    }
    coverImage {
      url
      width
      height
    }
  }
`;
