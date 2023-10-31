export function Form(props: React.ComponentProps<"form">) {
  return (
    <form {...props} className="flex flex-col gap-4">
      {props.children}
    </form>
  );
}
