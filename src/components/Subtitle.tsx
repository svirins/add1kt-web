export function Subtitle({ children }: { children: string }) {
  return (
    <h3 className="font-semibold text-2xl md:text-3xl tracking-tight mb-6 text-gray-800 dark:text-gray-200">
      {children}
    </h3>
  );
}
