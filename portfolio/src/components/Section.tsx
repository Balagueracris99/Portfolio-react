import type { ReactNode } from "react";

export function Section(props: {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section id={props.id} className="scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            {props.eyebrow ? (
              <p className="text-sm font-medium text-zinc-400">
                {props.eyebrow}
              </p>
            ) : null}
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {props.title}
            </h2>
          </div>
        </div>
        {props.children}
      </div>
    </section>
  );
}

