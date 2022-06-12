import type {
  SanityAsset,
  SanityBlock,
  SanityDocument,
  SanityFile,
  SanityGeoPoint,
  SanityImage,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot,
  SanityImageMetadata,
  SanityImagePalette,
  SanityImagePaletteSwatch,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
} from 'sanity-codegen';

export type {
  SanityAsset,
  SanityBlock,
  SanityDocument,
  SanityFile,
  SanityGeoPoint,
  SanityImage,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot,
  SanityImageMetadata,
  SanityImagePalette,
  SanityImagePaletteSwatch,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
};

/**
 * Post
 *
 * Blog post.
 */
export interface Post extends SanityDocument {
  _type: 'post';

  /**
   * Title — `localeString`
   *
   *
   */
  title: LocaleString;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string };

  /**
   * Cover Image — `image`
   *
   *
   */
  coverImage: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Featured — `boolean`
   *
   *
   */
  featured?: boolean;

  /**
   * Author — `reference`
   *
   *
   */
  author: SanityReference<Author>;

  /**
   * Post text — `localePortableText`
   *
   *
   */
  text: LocalePortableText;

  /**
   * Tags — `array`
   *
   *
   */
  tags?: Array<SanityKeyedReference<Tag>>;

  /**
   * Related Posts — `array`
   *
   *
   */
  relatedPosts?: Array<SanityKeyedReference<Post>>;
}

/**
 * Author
 *
 * Info, short bio and contacts
 */
export interface Author extends SanityDocument {
  _type: 'author';

  /**
   * Title — `localeString`
   *
   *
   */
  title: LocaleString;

  /**
   * slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string };

  /**
   * Picture — `image`
   *
   *
   */
  picture: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Bio — `localePortableText`
   *
   *
   */
  bio: LocalePortableText;

  /**
   * Social — `array`
   *
   *
   */
  social?: Array<SanityKeyed<string>>;
}

/**
 * Tag
 *
 * Tagged content is easy to sort and filter
 */
export interface Tag extends SanityDocument {
  _type: 'tag';

  /**
   * Title — `localeString`
   *
   *
   */
  title: LocaleString;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string };

  /**
   * Picture — `image`
   *
   *
   */
  picture: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Text — `localePortableText`
   *
   *
   */
  text: LocalePortableText;
}

/**
 * Page
 *
 * Standalone page (e.g. About page)
 */
export interface Page extends SanityDocument {
  _type: 'page';

  /**
   * Title — `localeString`
   *
   *
   */
  title: LocaleString;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string };

  /**
   * Picture — `image`
   *
   *
   */
  picture: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Text — `localePortableText`
   *
   *
   */
  text: LocalePortableText;
}

export type Break = {
  _type: 'break';
  /**
   * Break style — `string`
   *
   *
   */
  style?: 'lineBreak' | 'readMore';
};

export type PortableText = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<Break>
  | SanityKeyed<{
      _type: 'image';
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  | SanityKeyedReference<Post | Author | Tag | Page>
>;

export type LocaleString = {
  _type: 'localeString';
  /**
   * Russian — `string`
   *
   *
   */
  ru?: string;

  /**
   * Polish — `string`
   *
   *
   */
  pl?: string;
};

export type LocalePortableText = {
  _type: 'localePortableText';
  /**
   * Russian — `portableText`
   *
   *
   */
  ru?: PortableText;

  /**
   * Polish — `portableText`
   *
   *
   */
  pl?: PortableText;
};

export type Documents = Post | Author | Tag | Page;
