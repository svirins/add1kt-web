import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function NavItemFooter({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <a
        className={cn(
          isActive ? ' text-teal-600' : 'text-gray-800  dark:text-gray-50',
          'nav-link font-medium pr-4 text-sm md:text-base items-center'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </Link>
  );
}
