import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { open } from "../../src/features/sidebarSlice";
import { signin, logout } from "../../src/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/router";

export default function Header() {
  const dispatch = useDispatch();
  const auth = useSelector<any>((state) => state.auth.value);
  const router = useRouter();

  useLayoutEffect(() => {
    const cookie = document.cookie;
    cookie.split("; ").forEach((item) => {
      if (item.startsWith("token=")) {
        dispatch(signin(item.split("=")[1]));
      }
    });
  }, []);

  return (
    <header className="flex bg-orange-500 text-white  sm:py-2 py-1 px-6 justify-between items-center space-x-10">
      <Link href="/">
        <a className="text-lg tracking-wide text-white font-slab">AIS</a>
      </Link>{" "}
      <form className="hidden sm:block flex-1">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 w-full outline-none focus:border-white bg-transparent placeholder:text-white"
        />
      </form>
      <section className="hidden sm:block space-x-7">
        {auth ? (
          <>
            <Link href="/notifications">
              <a className="hover:underline underline-offset-1 decoration-dotted">
                <NotificationsIcon className="text-white " />
              </a>
            </Link>
            <Link href="/profile">
              <a className="hover:underline underline-offset-1 decoration-dotted">
                Profile
              </a>
            </Link>{" "}
            <button
              onClick={() => {
                document.cookie = `token=; max-age=${0}`;
                dispatch(logout());
                router.push("/");
              }}
              className="bg-white text-orange-500 px-2"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/register">
              <a className="hover:underline underline-offset-1 decoration-dotted">
                Register
              </a>
            </Link>{" "}
            <Link href="/login">
              <a className="hover:underline underline-offset-1 decoration-dotted">
                Login
              </a>
            </Link>
          </>
        )}
      </section>
      <button
        onClick={() => dispatch(open())}
        className="p-2 hover:cursor-pointer block sm:hidden"
      >
        <MenuIcon />
      </button>
    </header>
  );
}
