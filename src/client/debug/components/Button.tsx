type TButtonProps = React.ComponentProps<"button">;

export function Button(props: TButtonProps) {
  return (
    <button
      {...props}
      className="bg-slate-700 border border-slate-700 rounded py-1 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {props.children}
    </button>
  );
}
