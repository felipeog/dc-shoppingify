import { clsx } from "clsx";
import { Link } from "@wasp/router";
import { QueryContainer } from "./QueryContainer";
import { useLocation } from "react-router-dom";

type TLayoutProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
};

const routes = [
  {
    to: "/debug" as "/debug",
    label: "Debug",
  },
  {
    to: "/debug/category" as "/debug/category",
    label: "Category",
  },
  {
    to: "/debug/item" as "/debug/item",
    label: "Item",
  },
  {
    to: "/debug/items-list" as "/debug/items-list",
    label: "ItemsList",
  },
  {
    to: "/debug/list-item" as "/debug/list-item",
    label: "ListItem",
  },
];

export function Layout(props: TLayoutProps) {
  const location = useLocation();

  const currentRoute = routes.find((route) => route.to === location.pathname);

  return (
    <div className="container mx-auto px-4">
      <nav className="border-b border-gray-300">
        <ul className="flex gap-4">
          {routes.map((route) => (
            <li key={route.to}>
              <Link
                to={route.to}
                className={clsx("block py-4", {
                  underline: route.to === currentRoute?.to,
                })}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <main className="mt-6">
        <h1 className="text-2xl mb-4">{currentRoute?.label}</h1>

        <QueryContainer isLoading={props.isLoading} error={props.error}>
          {props.children}
        </QueryContainer>
      </main>
    </div>
  );
}
