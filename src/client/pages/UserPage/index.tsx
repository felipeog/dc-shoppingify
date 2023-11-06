import { Layout } from "../../components/Layout";
import { User } from "@wasp/auth/types";
import logout from "@wasp/auth/logout";

type TUserPageProps = {
  user: User;
};

export function UserPage(props: TUserPageProps) {
  console.log(props);

  return (
    <Layout>
      <ul>
        <li>Username: {props.user.username}</li>
        <li>Since: {props.user.createdAt.toLocaleDateString()}</li>
      </ul>

      <button onClick={logout}>Logout</button>
    </Layout>
  );
}
