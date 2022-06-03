import cn from 'classnames';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

function NavItemFooter({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive ? ' text-teal-600' : '',
          'font-medium p-2 text-sm md:text-base items-center transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}
export default NavItemFooter;
