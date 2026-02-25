import type { ReactNode } from "react";

export function Badge(props: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-700/70 bg-zinc-800/70 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur">
      {props.children}
    </span>
  );
}

