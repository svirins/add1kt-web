import cn from 'classnames';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

function NavItemHeader({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive ? ' text-teal-600' : '',
          'hidden font-medium text-xl md:inline-block p-2 lg:py-4 items-center transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}
export default NavItemHeader
