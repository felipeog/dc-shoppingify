import { LeftSidebar } from "../LeftSidebar";
import { MainContent } from "../MainContent";
import { RightSidebar } from "../RightSidebar";

type TLayoutProps = {
  children: React.ReactNode;
};

export function Layout(props: TLayoutProps) {
  return (
    <main className="h-screen flex overflow-hidden">
      <LeftSidebar />
      <MainContent>{props.children}</MainContent>
      <RightSidebar />
    </main>
  );
}
