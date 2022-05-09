export const ALL_POST_DATA = `
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
`;
