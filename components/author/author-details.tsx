import CoverImage from '@/components/image/cover-image';
import PageTitle from '@/components/misc/page-title';

export default function AuthorDetails({ title, coverImage }) {
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
    </section>
  );
}
