import Header from "./Header";
import SideNav from "./SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-roboto w-screen h-screen overflow-hidden">
      <Header />
      <SideNav />
      {children}
    </div>
  );
}
