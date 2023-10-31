import { Link, routes as routerRoutes } from "@wasp/router";
import { useLocation } from "react-router-dom";

type TLayoutProps = {
  children: React.ReactNode;
};

const routes = [
  {
    to: routerRoutes.DebugRoute.to,
    label: "Debug",
  },
  {
    to: routerRoutes.DebugCategoryRoute.to,
    label: "Category",
  },
  {
    to: routerRoutes.DebugItemRoute.to,
    label: "Item",
  },
  {
    to: routerRoutes.DebugItemsListRoute.to,
    label: "ItemsList",
  },
  {
    to: routerRoutes.DebugListItemRoute.to,
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
                className={`block py-4 ${
                  route.to === currentRoute?.to ? "underline" : ""
                }`}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <main className="mt-6">
        <h1 className="text-2xl mb-4">{currentRoute?.label}</h1>

        {props.children}
      </main>
    </div>
  );
}
