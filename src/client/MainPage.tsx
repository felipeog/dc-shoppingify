import "./Main.css";
import { Link } from "@wasp/router";
import { User } from "@wasp/entities";
import logout from "@wasp/auth/logout";

export function MainPage({ user }: { user: User }) {
  return (
    <main>
      <Link to="/debug/category">Debug</Link>

      <br />
      <br />
      <br />

      <pre>{JSON.stringify({ user }, null, 2)}</pre>
      <button onClick={logout}>Logout</button>
    </main>
  );
}
