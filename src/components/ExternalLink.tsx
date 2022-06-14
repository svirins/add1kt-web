export function ExternalLink(
  { href, children }: {
    href: string;
    children: JSX.Element;
  },
) {
  return (
    <a
      className="font-medium pl-4 text-sm md:text-base items-center transition-all delay-100 text-gray-800 dark:text-gray-50 hover:text-teal-800 dark:hover:text-teal-400"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  );
}
