import { User } from "@wasp/entities";
import logout from "@wasp/auth/logout";

export function MainPage({ user }: { user: User }) {
  return (
    <div className="container">
      <main>
        <pre>{JSON.stringify({ user })}</pre>
        <button onClick={logout}>Logout</button>
      </main>
    </div>
  );
}
