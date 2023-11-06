import { clsx } from "clsx";
import { ERightSidebar } from "../../types";
import { Link } from "@wasp/router";
import { useAppState } from "../../state";
import { useLocation } from "react-router-dom";

const routes = [
  {
    to: "/" as "/",
    label: "Items",
  },
  {
    to: "/history" as "/history",
    label: "History",
  },
  {
    to: "/statistics" as "/statistics",
    label: "Statistics",
  },
];

export function LeftSidebar() {
  const state = useAppState();
  const location = useLocation();

  const currentRoute = routes.find((route) => route.to === location.pathname);

  function handleCartButtonClick() {
    if (state.selectedRightSidebar.value === ERightSidebar.ITEMS_LIST) {
      state.selectedRightSidebar.value = null;
    } else {
      state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
    }
  }

  return (
    <section className="bg-white flex-shrink-0 flex flex-col justify-between w-24">
      <Link to="/user">User</Link>

      <nav>
        <ul>
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

      {/* TODO: break into separate component */}
      <button onClick={handleCartButtonClick}>Cart</button>
    </section>
  );
}
