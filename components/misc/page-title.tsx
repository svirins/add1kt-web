export default function PageTitle({ children }) {
  return (
    <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
      {children}
    </h1>
  );
}
