export default function PageTitle({ children }) {
  return (
    <h2 className="mb-4 md:mb-8 text-3xl md:text-5xl font-bold tracking-tight">
      {children}
    </h2>
  );
}
