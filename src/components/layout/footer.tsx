export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 dark:border-neutral-800">
      <div className="mx-auto max-w-4xl px-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Ruben Christoffer Damsgaard
      </div>
    </footer>
  );
}
