function ExternalLink({ href, children }) {
  return (
    <a
      className="font-medium text-base p-2 items-center transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  );
}

export default ExternalLink;
