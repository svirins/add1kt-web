import RoundImage from '@/components/RoundImage';
import PostBody from '@/components/PostBody';
import Socials from '@/components/Socials';
export default function PageTop({
  title,
  subtitle = '',
  socials = [],
  pictureUrl = "",
  text
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-start">
      <div className="flex flex-col pr-8">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1">
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
            {subtitle}
          </h2>
        )}
        <PostBody text={text} />
        <div className="flex itms-center align-middle mb-2">
          {socials.length > 0 && <Socials socials={socials} />}
        </div>
      </div>
      {pictureUrl && (      <div className="flex-col">
        <div className="mb-4 md:mb-0   w-32 h-32 md:w-48 md:h-48">
          <RoundImage alt={title} width={256} height={256} url={pictureUrl} />
        </div>
      </div>)}

    </div>
  );
}
