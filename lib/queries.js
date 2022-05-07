export const ALL_POST_DATA = `
  slug
  title
  coverImage {
    url
  }
  featured
  content
  authorCollection {
    items {
      name
      slug
      picture {
        url
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
    publishedAt
  }
`;
