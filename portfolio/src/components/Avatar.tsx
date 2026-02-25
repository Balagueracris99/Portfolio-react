import { useMemo, useState } from "react";

function initialsFromName(name: string) {
  const parts = name
    .trim()
    .split(/\s+/g)
    .filter(Boolean)
    .slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("") || "TU";
}

export function Avatar(props: {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [failed, setFailed] = useState(false);
  const initials = useMemo(() => initialsFromName(props.name), [props.name]);

  const sizeClass =
    props.size === "sm"
      ? "h-10 w-10 text-sm"
      : props.size === "lg"
        ? "h-40 w-40 text-4xl"
        : "h-14 w-14 text-base";

  const canShowImg = Boolean(props.src) && !failed;

  return (
    <div
      className={[
        "relative grid shrink-0 place-items-center overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-800",
        sizeClass,
      ].join(" ")}
      aria-label={`Foto de ${props.name}`}
    >
      {canShowImg ? (
        <img
          src={props.src}
          alt={props.name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-zinc-800 to-zinc-950">
          <span className="font-semibold tracking-tight text-zinc-100">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}

