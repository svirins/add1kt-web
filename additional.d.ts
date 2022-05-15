export type CoverImageProps = {
  width: string | number;
  height?: string | number;
  slug?: string;
  url: string;
  title: string;
};

export type ContainerProps =
  | {
      title: string;
      description?: string;
      imageUrl?: string;
      type: string;
      date?: string;
    }
  | any;
