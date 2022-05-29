
import PostCard from '@/components/post/post-card';
export default function MorePosts({ posts }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 gap-y-10 mb-12">
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
            readingTime={post.readingTime}
          />
        );
      })}
    </section>
  );
}
