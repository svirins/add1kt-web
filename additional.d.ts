export type CoverImageProps = {
  width: number;
  height: number;
  slug?: string;
  url: string;
  title: string;
};

export type ContainerProps = {
  title: string;
  description?: string;
  imageUrl?: string;
  type: ContainerType;
  date?: string;
};

export enum ContainerType {
  page,
  article
}
