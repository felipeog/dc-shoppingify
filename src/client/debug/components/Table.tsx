export function Table(props: { children: React.ReactNode }) {
  return (
    <table className="border-collapse table-auto w-full">
      {props.children}
    </table>
  );
}

export function TableRow(props: { children: React.ReactNode }) {
  return <tr className="text-left">{props.children}</tr>;
}

export function TableHeader(props: { children: React.ReactNode }) {
  return <th className="border-b border-slate-700 p-2">{props.children}</th>;
}

export function TableData(props: { children: React.ReactNode }) {
  return <td className="border-b border-slate-800 p-2">{props.children}</td>;
}
