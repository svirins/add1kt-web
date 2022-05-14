import CoverImage from '@/components/image/cover-image';
import PostBody from '@/components/post/post-body';
import PageTitle from '@/components/misc/page-title';

export default function HomePage({ title, coverImage, body }) {
  return (
    <section>
      <PageTitle>{title}</PageTitle>
      <div className="mb-8 md:mb-16">
        <CoverImage
          title={title}
          url={coverImage.url}
          width={coverImage.width}
          height={coverImage.height}
        />
      </div>
        <div>
          <PostBody content={body} />
        </div>
    </section>
  );
}
