import { Link } from "@wasp/router";
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

        <Container isLoading={props.isLoading} error={props.error}>
          {props.children}
        </Container>
      </main>
    </div>
  );
}

type TContainerProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
};

function Container(props: TContainerProps) {
  if (props.isLoading) {
    return <p>Loading...</p>;
  }

  if (props.error) {
    return <p>Error: {props.error.message}</p>;
  }

  return props.children;
}
