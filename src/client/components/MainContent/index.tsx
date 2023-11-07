type TMainContentProps = {
  children: React.ReactNode;
};

export function MainContent(props: TMainContentProps) {
  return (
    <section className="bg-cyan-50 flex-grow overflow-x-hidden overflow-y-auto">
      MainContent
      {props.children}
    </section>
  );
}
