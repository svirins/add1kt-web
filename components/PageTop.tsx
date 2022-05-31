import RoundImage from '@/components/RoundImage';
import PostBody from '@/components/PostBody';

export default function PageTop({
  title,
  subtitle = '',
  socials = [],
  pictureUrl,
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
        {socials.map((social, index) => (
          <p key={index}>{social}</p>
        ))}
      </div>
      <div className=" mb-8 md:mb-0   w-32 h-32 md:w-64 md:h-64 ">
        <RoundImage alt={title} width={256} height={256} url={pictureUrl} />
      </div>
    </div>
  );
}
