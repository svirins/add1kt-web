export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type PageProps = UnwrapPromise<
  ReturnType<typeof getStaticProps>
>["props"];

export interface IParams extends ParsedUrlQuery {
  slug: string;
}
