import { ExternalLink } from '@/components/ExternalLink';
import { getSocialIconByLink } from '@/utils/contentUtils';

export function Socials({ socials }: { socials: string[] }) {
  const icons = socials.map((social, index) => (
      <ExternalLink key={index} href={social}>
        {getSocialIconByLink(social)!}
      </ExternalLink>
  ),);
  return <>{icons}</>;
}
