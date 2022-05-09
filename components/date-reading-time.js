import { format } from 'date-fns';

export default function DateReadingTime({ date, readingTime }) {
  return (
    <>
      <time className="flex" dateTime={date}>
        {format(new Date(date), 'LLLL	d, yyyy')}
      </time>
      <div className="flex text-xs">{`${readingTime} мин. чтения`}</div>
    </>
  );
}
