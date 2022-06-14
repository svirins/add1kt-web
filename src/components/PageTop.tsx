import { PostBody } from '@/components/PostBody';
import { SanityImage } from '@/components/SanityImage';
import { Socials } from '@/components/Socials';
import { globalConfig } from '@/config/global.config';
import type { PortableText } from '@/typings/schema-types';

export type PageTopProps = {
  title: string;
  subtitle?: string;
  socials?: string[];
  pictureUrl?: string;
  text: PortableText;
};

export function PageTop(
  {
    title, subtitle = '', socials = [], pictureUrl = '', text
  }: PageTopProps,
) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-start">
      <div className="flex flex-col pr-8">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1  text-gray-800 dark:text-gray-200">
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight  text-gray-800 dark:text-gray-200">
            {subtitle}
          </h2>
        )}
        <PostBody text={text} />
        <div className="flex itms-center align-middle mb-2">
          {socials.length > 0 && <Socials socials={socials} />}
        </div>
      </div>
      {pictureUrl && (
        <div className="flex-col">
          <div className="mb-4 md:mb-0 w-32 h-32 md:w-48 md:h-48">
            <SanityImage
              alt={title}
              width={globalConfig.images.defaultRoundImageWidthHeight}
              isRounded={true}
              url={pictureUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
}
