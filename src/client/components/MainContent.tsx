type TMainContentProps = {
  children: React.ReactNode;
};

export function MainContent(props: TMainContentProps) {
  return (
    <section className="bg-cyan-50 flex-grow">
      MainContent
      {props.children}
    </section>
  );
}
