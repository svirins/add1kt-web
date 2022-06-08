import imageUrlBuilder from '@sanity/image-url';

const DEFAULT_BLUR_UP_IMAGE_WIDTH = 64;
const DEFAULT_BLUR_UP_IMAGE_QUALITY = 30;
const DEFAULT_BLUR_UP_AMOUNT = 50;
const DEFAULT_FALLBACK_IMAGE_QUALITY = 75;

const DEFAULT_BLUR_IMAGE_BUILDER = (imageUrlBuilder) => {
  return imageUrlBuilder
    .width(DEFAULT_BLUR_UP_IMAGE_WIDTH)
    .quality(DEFAULT_BLUR_UP_IMAGE_QUALITY)
    .blur(DEFAULT_BLUR_UP_AMOUNT)
    .fit('clip');
};

const DEFAULT_IMAGE_BUILDER = (imageUrlBuilder, width) => {
  const result = imageUrlBuilder
    .quality(DEFAULT_FALLBACK_IMAGE_QUALITY)
    .fit('clip');
  if (options.width !== null) {
    return result.width(options.width);
  }
  return result;
};

function getImageDimensions(image) {
  const dimensions = image?.split('-')[2] ?? '800x600';
  const [width, height] = dimensions.split('x').map((num) => parseInt(num, 10));
  const aspectRatio = width / height;
  return { width, height, aspectRatio };
}

function getCroppedDimensions(image, baseDimensions) {
  const crop = image.crop;
  if (!crop) {
    return baseDimensions;
  }
  const { width, height } = baseDimensions;
  const croppedWidth = width * (1 - (crop.left + crop.right));
  const croppedHeight = height * (1 - (crop.top + crop.bottom));
  return {
    width: croppedWidth,
    height: croppedHeight,
    aspectRatio: croppedWidth / croppedHeight
  };
}

export default function useNextSanityImage(sanityClient, image, options) {
  const enableBlurUp = true;
  const blurAmount = 50;
  const blurUpImageQuality = 80;
  const blurUpImageWidth = 800;
  const blurUpImageBuilder = DEFAULT_BLUR_IMAGE_BUILDER;
  const imageBuilder = DEFAULT_IMAGE_BUILDER(options.width ?? '800');
  return react.useMemo(() => {
    const originalImageDimensions = getImageDimensions(image);
    const croppedImageDimensions = getCroppedDimensions(
      image,
      originalImageDimensions
    );
    const loader = ({ width, quality }) => {
      return (
        imageBuilder(
          imageUrlBuilder__default['default'](sanityClient)
            .image(image)
            .auto('format'),
          {
            width,
            originalImageDimensions,
            croppedImageDimensions,
            quality: quality || null
          }
        ).url() || ''
      );
    };
    const baseImgBuilderInstance = imageBuilder(
      imageUrlBuilder__default['default'](sanityClient)
        .image(image)
        .auto('format'),
      {
        width: null,
        originalImageDimensions,
        croppedImageDimensions,
        quality: null
      }
    );
    const width =
      baseImgBuilderInstance.options.width ||
      (baseImgBuilderInstance.options.maxWidth
        ? Math.min(
            baseImgBuilderInstance.options.maxWidth,
            croppedImageDimensions.width
          )
        : croppedImageDimensions.width);
    const height =
      baseImgBuilderInstance.options.height ||
      (baseImgBuilderInstance.options.maxHeight
        ? Math.min(
            baseImgBuilderInstance.options.maxHeight,
            croppedImageDimensions.height
          )
        : Math.round(width / croppedImageDimensions.aspectRatio));
    const props = {
      loader,
      src: baseImgBuilderInstance.url(),
      width,
      height
    };
    if (enableBlurUp) {
      const blurImgBuilderInstance = blurUpImageBuilder(
        imageUrlBuilder__default['default'](sanityClient)
          .image(image)
          .auto('format'),
        {
          width: blurUpImageWidth,
          originalImageDimensions,
          croppedImageDimensions,
          quality: blurUpImageQuality,
          blurAmount: blurAmount
        }
      );
      return {
        ...props,
        blurDataURL: blurImgBuilderInstance.url(),
        placeholder: 'blur'
      };
    }
    return { ...props, placeholder: 'empty' };
  }, [
    blurAmount,
    blurUpImageBuilder,
    blurUpImageQuality,
    blurUpImageWidth,
    enableBlurUp,
    imageBuilder,
    image,
    sanityClient
  ]);
}
