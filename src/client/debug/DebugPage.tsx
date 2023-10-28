import { Link } from "@wasp/router";

export function DebugPage() {
  return (
    <main>
      <h1>Debug</h1>

      <nav>
        <ul>
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
    </main>
  );
}
