export type ContainerProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
  type: string;
  date?: string;
  children: React.ReactNode;
};

export type ImageProps = {
  title: string;
  width?: string | number;
  height?: string | number;
  url: string;
  slug?: string;
};
