import { Link, useMatches } from "@tanstack/react-router";

export function HeaderSubNav() {
  const matches = useMatches();

  const lastMatch = matches[matches.length - 1];
  const subNav = lastMatch?.context.subNav ?? lastMatch?.staticData.subNav;

  if (!subNav) {
    return null;
  }

  return (
    <div className="-mb-2 flex items-center gap-6">
      {subNav.map((item) => (
        <Link
          key={item.url}
          to={item.url}
          params={lastMatch.params}
          className="text-muted-foreground data-active:border-white data-active:text-foreground border-b border-transparent py-2 text-sm"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
