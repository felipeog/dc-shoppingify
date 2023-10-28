import { Link } from "@wasp/router";

type TLayoutProps = {
  children: React.ReactNode;
};

const styles = {
  ul: {
    display: "flex",
    gap: "1rem",
    padding: 0,
    margin: "0 0 2rem",
    listStyleType: "none",
  },
};

export function Layout(props: TLayoutProps) {
  return (
    <div>
      <nav>
        <ul style={styles.ul}>
          <li>
            <Link to="/debug">Debug</Link>
          </li>
          <li>
            <Link to="/debug/category">Category</Link>
          </li>
          <li>
            <Link to="/debug/item">Item</Link>
          </li>
          <li>
            <Link to="/debug/items-list">ItemsList</Link>
          </li>
          <li>
            <Link to="/debug/list-item">ListItem</Link>
          </li>
        </ul>
      </nav>

      <main>{props.children}</main>
    </div>
  );
}
