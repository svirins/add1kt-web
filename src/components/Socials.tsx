import { ExternalLink } from "@/components/ExternalLink";
import { facebook, telegram, youtube } from "@/components/Icons";

function getSocialIconByLink(url: string) {
  if (url.search(/youtube/i) !== -1) {
    return youtube;
  }
  if (url.search(/facebook/i) !== -1) {
    return facebook;
  }
  if (url.search(/t.me/i) !== -1) {
    return telegram;
  }
  return null;
}

export function Socials({ socials }: { socials: string[] }) {
  const icons = socials.map((social, index) => (
    <ExternalLink key={index} href={social}>
      {getSocialIconByLink(social)!}
    </ExternalLink>
  ));
  return <>{icons}</>;
}
