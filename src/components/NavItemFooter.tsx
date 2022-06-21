import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import { getActiveStatus } from "@/utils/contentUtils";

export function NavItemFooter({ href, text }: { href: string; text: string }) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={cn(
          getActiveStatus(href, router.asPath)
            ? "text-orange-600 dark:text-green-400"
            : "text-gray-800  dark:text-gray-50",
          "nav-link items-center pr-4 text-sm font-medium md:text-base"
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </Link>
  );
}
