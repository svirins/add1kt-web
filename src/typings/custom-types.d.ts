export type TUnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type TPageProps = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export interface IParams extends ParsedUrlQuery {
  slug: string;
}
