import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

function NavItemHeader({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <a
        className={cn(
          isActive ? ' text-teal-600' : '',
          'font-medium text-base md:text-xl  inline-block pr-4 lg:py-4 items-center transition-all delay-100 text-gray-800 dark:text-gray-50 hover:text-teal-800 dark:hover:text-teal-400'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </Link>
  );
}
export default NavItemHeader;
