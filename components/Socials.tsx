import { ExternalLink } from '@/components/ExternalLink';
import { getSocialIconByLink } from '@/lib/contentUtils';

export function Socials({ socials }) {
  const icons = socials.map((social, index) => {
    return (
      <ExternalLink key={index} href={social}>
        {getSocialIconByLink(social)}
      </ExternalLink>
    );
  });
  return <>{icons}</>;
}
