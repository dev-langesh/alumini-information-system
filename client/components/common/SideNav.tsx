import React, { useEffect, useState } from "react";
import Link from "next/link";
import { navWithAuthObj, navWithoutAuthObj } from "./navigateObj";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../src/features/sidebarSlice";
import { useRouter } from "next/router";
import { logout } from "../../src/features/authSlice";

type objType = {
  key: number;
  title: string;
  href: string;
}[];

export default function SideNav() {
  const state = useSelector<"open" | "close" | any>((s) => s.sidebar.value);
  const auth = useSelector<any>((state) => state.auth.value);
  const dispatch = useDispatch();
  const [navObj, setNavObj] = useState<objType>([] as objType);
  const router = useRouter();

  useEffect(() => {
    if (auth) {
      setNavObj(navWithAuthObj);
      return;
    }
    setNavObj(navWithoutAuthObj);
  }, [auth]);

  function closeSideBar() {
    dispatch(close());
  }

  const signout = () => {
    closeSideBar();
    document.cookie = `token=; max-age=${0}`;
    dispatch(logout());
    router.push("/");
  };

  return (
    <aside
      className={`absolute top-0 left-0 transform ${
        state === "open" ? "translate-x-0" : "-translate-x-[250px]"
      } w-[250px] bg-white shadow shadow-orange-200 h-screen flex flex-col transition duration-200 sm:hidden z-50`}
    >
      <Link href="/">
        <a
          onClick={closeSideBar}
          className="pl-3 text-xl font-slab font-semibold text-orange-500 tracking-wider py-5"
        >
          AIS
        </a>
      </Link>
      <nav className="flex flex-col space-y-1 flex-1">
        <>
          {navObj.map((item) => {
            return (
              <Navigate
                close={closeSideBar}
                key={item.key}
                href={item.href}
                title={item.title}
              />
            );
          })}
          {auth && (
            <button
              onClick={signout}
              className="block text-left hover:bg-orange-50 hover:text-orange-600 p-3 hover:tracking-widest hover:border-r-4 border-orange-400 transition-all duration-150"
            >
              Logout
            </button>
          )}
        </>
      </nav>

      <footer>
        <button
          onClick={closeSideBar}
          className="py-3 text-center w-full bg-orange-100 hover:bg-orange-600 hover:text-white text-orange-600 transition-all duration-300 "
        >
          Close
        </button>
      </footer>
    </aside>
  );
}

type navigateProps = {
  href: string;
  title: string;
  close: (e: React.MouseEvent) => void;
};

function Navigate({ href, title, close }: navigateProps) {
  return (
    <Link href={`${href}`}>
      <a
        onClick={close}
        className="block hover:bg-orange-50 hover:text-orange-600 p-3 hover:tracking-widest hover:border-r-4 border-orange-400 transition-all duration-150"
      >
        {title}
      </a>
    </Link>
  );
}
