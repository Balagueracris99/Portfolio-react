export function Footer(props: { name: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-800/70 bg-zinc-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-zinc-400 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {props.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

