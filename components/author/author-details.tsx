import CoverImage from '@/components/cover-image';
import PageTitle from '@/components/misc/page-title';

export default function AuthorDetails({ title, coverImage }) {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage
          title={title}
          url={coverImage.url}
          width={coverImage.width}
          height={coverImage.height}
        />
      </div>
      <div className="max-w-2xl mx-auto"></div>
    </>
  );
}
