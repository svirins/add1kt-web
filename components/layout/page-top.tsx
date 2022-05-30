import RoundImage from '@/components/image/round-image';
import PageTitle from '@/components/misc/page-title';
import Subtitle from '@/components/misc/subtitle';
import PostBody from '@/components/misc/post-body';

export default function PageTop({
  title,
  subtitle = '',
  socials = [],
  pictureUrl,
  text
}) {
  return (
    <section>
      <PageTitle>{title}</PageTitle>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <RoundImage
        alt={title}
        // width={128}
        // height={128}
        url={pictureUrl}
        className="w-24 h-24"
      />
      <PostBody text={text} />
      {socials.length > 0 &&
        socials.map((social, index) => <p key={index}>{social}</p>)}
    </section>
  );
}
