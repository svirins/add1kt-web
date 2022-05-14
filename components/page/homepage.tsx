import ShimmerImage from '@/components/image/cover-image';
import PostBody from '@/components/post/post-body';

export default function HomePage({ title, coverImage, body }) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <ShimmerImage
          title={title}
          url={coverImage.url}
          width={coverImage.width}
          height={coverImage.height}
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <a className="hover:underline">{title}</a>
          </h3>
        </div>
        <div>
          <PostBody content={body} />
        </div>
      </div>
    </section>
  );
}
