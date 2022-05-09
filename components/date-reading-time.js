import { format } from 'date-fns';

export default function DateReadingTime({ date, readingTime }) {
  return (
    <>
      <time className="flex" dateTime={date}>
        {format(new Date(date), 'LLLL	d, yyyy')}
      </time>
      <div className="flex">{`${readingTime} мин. чтения`}</div>
    </>
  );
}
