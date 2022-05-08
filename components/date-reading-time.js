import { format } from 'date-fns';

export default function DateReadingTime({ date, readingTime }) {
  return (
    <div className="mb-2 text-lg flex flex-row">
      <time dateTime={date}>{format(new Date(date), 'LLLL	d, yyyy')}</time>
      <div className="italic  inline-flex items-center">{`${readingTime} мин. чтения`}</div>
    </div>
  );
}
