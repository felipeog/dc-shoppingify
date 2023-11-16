type TMainContentProps = {
  children: React.ReactNode;
};

export function MainContent(props: TMainContentProps) {
  return (
    <section className="bg-cyan-50 flex-grow overflow-x-hidden overflow-y-auto">
      <div className="max-w-screen-xl mx-auto p-4">{props.children}</div>
    </section>
  );
}
