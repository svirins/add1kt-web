import { PostCard } from '@/components/PostCard';

export function PostsGrid({ posts }) {
  return (
    <section className="mb-16 grid grid-cols-1 gap-x-0 gap-y-10 md:grid-cols-2 md:gap-x-12">
      {posts.map((post) => {
        return (
          <PostCard
            key={post.postSlug}
            title={post.postTitle}
            previewImage={post.postImageUrl}
            date={post.postDate}
            author={post.author}
            tags={post.tags}
            slug={post.postSlug}
            readingTime={Number(post.readingTime)}
          />
        );
      })}
    </section>
  );
}
