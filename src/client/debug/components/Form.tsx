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
      className="bg-gray-900 border-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}
