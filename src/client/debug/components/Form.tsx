export function Form(props: React.ComponentProps<"form">) {
  return (
    <form {...props} className="flex flex-col gap-4">
      {props.children}
    </form>
  );
}

export function Input(props: React.ComponentProps<"input">) {
  return (
    <input
      {...props}
      className="bg-slate-900 border-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}

export function Select(props: React.ComponentProps<"select">) {
  return (
    <select
      {...props}
      className="bg-slate-900 border-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}
