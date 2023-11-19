import { GrLogout } from "react-icons/gr";
import { User } from "@wasp/auth/types";
import logout from "@wasp/auth/logout";

type TUserPageProps = {
  user: User;
};

export function UserPage(props: TUserPageProps) {
  return (
    <>
      <p>
        <strong>{props.user.username}</strong>, member since{" "}
        <strong>{props.user.createdAt.toLocaleDateString()}</strong>.
      </p>

      <button
        className="flex gap-4 items-center mt-12 border px-4 py-2 rounded"
        onClick={logout}
      >
        Logout <GrLogout />
      </button>
    </>
  );
}
