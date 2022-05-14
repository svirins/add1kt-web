import Avatar from '@/components/author/avatar';

export default function Authors({ authors }) {
  return (
    <>
      {authors &&
        authors.map((author) => (
          <Avatar
            key={author.slug}
            name={author.name}
            picture={author.picture}
            slug={author.slug}
          />
        ))}
    </>
  );
}
