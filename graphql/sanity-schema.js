
const supportedLanguages = [
  { id: 'ru', title: 'Russian', isDefault: true },
  { id: 'pl', title: 'Polish' }
];
const baseLanguage = supportedLanguages.find((l) => l.isDefault);



const authorSchema = {
  name: 'author',
  title: 'Author',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'name'
      }
    },
    {
      name: 'picture',
      title: 'Picture',
      type: 'image'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'localePortableText'
    },
    {
      name: 'social',
      title: 'Social',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {}
        }
      ]
    }
  ]
};

const breakSchema = {
  name: 'break',
  type: 'object',
  title: 'Break',
  fields: [
    {
      name: 'style',
      type: 'string',
      title: 'Break style',
      options: {
        list: [
          {
            title: 'Line break',
            value: 'lineBreak'
          },
          {
            title: 'Read more',
            value: 'readMore'
          }
        ]
      }
    }
  ]
};
const pageSchema = {
  name: 'page',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'text',
      title: 'Text',
      type: 'localePortableText'
    }
  ]
};

const postSchema = {
  name: 'post',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean'
    },
    {
      name: 'author',
      title: 'Author',

      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'author'
            }
          ]
        }
      ]
    },
    {
      name: 'text',
      title: 'Post text',
      type: 'localePortableText'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'tag'
            }
          ]
        }
      ]
    },
    {
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'post'
            }
          ]
        }
      ]
    }
  ]
};

const portableTextSchema = {
  name: 'portableText',
  of: [
    {
      type: 'block',
      of: [
        {
          type: 'image'
        },
        {
          type: 'reference',
          to: [
            {
              type: 'post'
            },
            {
              type: 'author'
            },
            {
              type: 'tag'
            },
            {
              type: 'page'
            }
          ]
        }
      ],
      styles: [
        {
          title: 'Normal text',
          value: 'normal'
        },
        {
          title: 'Heading 1',
          value: 'h1'
        },
        {
          title: 'Heading 2',
          value: 'h2'
        },
        {
          title: 'Heading 3',
          value: 'h3'
        },
        {
          title: 'Heading 4',
          value: 'h4'
        },
        {
          title: 'Heading 5',
          value: 'h5'
        },
        {
          title: 'Heading 6',
          value: 'h6'
        },
        {
          title: 'Quote',
          value: 'blockquote'
        }
      ],
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          },
          {
            type: 'image'
          },
          {
            type: 'reference',
            to: [
              {
                type: 'post'
              },
              {
                type: 'author'
              },
              {
                type: 'tag'
              },
              {
                type: 'page'
              }
            ]
          }
        ]
      }
    },
    {
      type: 'break'
    },
    {
      type: 'image'
    },
    {
      type: 'reference',
      to: [
        {
          type: 'post'
        },
        {
          type: 'author'
        },
        {
          type: 'tag'
        },
        {
          type: 'page'
        }
      ]
    }
  ]
};

const tagSchema = {
  name: 'tag',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    },

    {
      name: 'text',
      title: 'Text',
      type: 'localePortableText'
    }
  ]
};
