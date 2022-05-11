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

export const HOMEPAGE_DATA = `
  title
  body {
    json
  }
  coverImage {
    url
    width
    height
  }
`;

export const ALL_POST_DATA_WITH_RELATED = `
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
    items{
      slug
    }
  }
`;
