import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function NavItemHeader({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <Link href={href}>
      <a
        className={cn(
          isActive ? ' text-teal-600' : 'text-gray-800  dark:text-gray-50',
          'nav-link font-medium text-base md:text-xl  inline-block pr-4 py-2 lg:py-4'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </Link>
  );
}
