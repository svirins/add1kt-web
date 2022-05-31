import { getSocialIconByLink } from '@/lib/content-utils';
import ExternalLink from '@/components/ExternalLink';

export default function Socials({ socials }) {
  const icons = socials.map((social, index) => {

      return (
      <ExternalLink key={index} href={social}>
        {getSocialIconByLink(social)}
      </ExternalLink>
    );
  });
  return <div className="inline-flex">{icons}</div>;
}
