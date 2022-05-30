export default function PageTitle({ children }) {
  return (
    <h1 className="mfont-bold text-3xl md:text-5xl tracking-tight mb-1">
      {children}
    </h1>
  );
}
