import { clsx } from "clsx";
import { ERightSidebar } from "../../types";
import {
  GrCart,
  GrBarChart,
  GrRotateLeft,
  GrUnorderedList,
  GrUser,
} from "react-icons/gr";
import { Link } from "@wasp/router";
import { Tooltip } from "react-tooltip";
import { useAppState } from "../../state";
import { useLocation } from "react-router-dom";

const routes = [
  {
    id: "items",
    to: "/" as "/",
    label: "Items",
    icon: <GrUnorderedList size="1.2rem" />,
  },
  {
    id: "history",
    to: "/history" as "/history",
    label: "History",
    icon: <GrRotateLeft size="1.2rem" />,
  },
  {
    id: "statistics",
    to: "/statistics" as "/statistics",
    label: "Statistics",
    icon: <GrBarChart size="1.2rem" />,
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
    <section className="bg-white flex-shrink-0 flex flex-col justify-between w-24 overflow-x-hidden overflow-y-auto py-6">
      <Link
        to="/user"
        className="self-center flex justify-center items-center shrink-0 w-10 h-10 bg-blue-950 rounded-full"
      >
        <GrUser size="1.2rem" className="text-white" />
      </Link>

      <nav>
        <ul className="flex flex-col gap-4">
          {routes.map((route) => (
            <li
              key={route.to}
              className={clsx(
                "relative flex justify-center items-center",
                "before:absolute before:w-2 before:bg-orange-400 before:top-0 before:left-0 before:bottom-0 before:rounded-r-md",
                {
                  "before:block": route.to === currentRoute?.to,
                  "before:hidden": route.to !== currentRoute?.to,
                }
              )}
            >
              <Link
                to={route.to}
                className="block py-4 p-4"
                data-tooltip-id={route.id}
                data-tooltip-content={route.label}
              >
                {route.icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {routes.map((route) => (
        <Tooltip key={route.id} id={route.id} place="right" />
      ))}

      {/* TODO: break into separate component */}
      <button
        onClick={handleCartButtonClick}
        className="self-center flex justify-center items-center shrink-0 w-10 h-10 bg-orange-400 rounded-full"
      >
        <GrCart size="1.2rem" className="text-white" />
      </button>
    </section>
  );
}
