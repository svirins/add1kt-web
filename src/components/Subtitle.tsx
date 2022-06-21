export function Subtitle({ children }: { children: string }) {
  return (
    <h3 className="gradient-header mb-6 text-2xl font-semibold tracking-tight md:text-3xl">
      {children}
    </h3>
  );
}
