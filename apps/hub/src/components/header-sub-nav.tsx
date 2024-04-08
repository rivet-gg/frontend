import { Link, useMatches } from "@tanstack/react-router";

export function HeaderSubNav() {
  const matches = useMatches();

  const lastMatch = matches[matches.length - 1];
  const subNav = lastMatch?.staticData.subNav;

  if (!subNav) {
    return null;
  }

  return (
    <div className="flex items-center gap-6 -mb-2">
      {subNav.map((item) => (
        <Link
          key={item.url}
          to={item.url}
          params={lastMatch.params}
          className="text-sm py-2 text-muted-foreground border-b border-transparent data-active:border-white data-active:text-foreground"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
