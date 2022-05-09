import Container from './container';
import cn from 'classnames';
import Link from 'next/link';

import { EXAMPLE_PATH } from '@/lib/constants';

import LocaleSwitcher from '@/components/locale-switcher';

export default function Alert({ preview }) {
  return (
    <div
      className={cn('border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This is page is a preview.{' '}
              <Link
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                Click here
              </Link>{' '}
              to exit preview mode.
            </>
          ) : (
            <LocaleSwitcher />
          )}
        </div>
      </Container>
    </div>
  );
}
