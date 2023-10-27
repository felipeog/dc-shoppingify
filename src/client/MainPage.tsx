import { User } from "@wasp/entities";
import logout from "@wasp/auth/logout";
import "./Main.css";

const MainPage = ({ user }: { user: User }) => {
  return (
    <div className="container">
      <main>
        <pre>{JSON.stringify({ user })}</pre>
        <button onClick={logout}>Logout</button>
      </main>
    </div>
  );
};

export default MainPage;
