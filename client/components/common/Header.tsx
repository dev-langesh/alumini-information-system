import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { open } from "../../src/features/sidebarSlice";
import { signin, logout } from "../../src/features/authSlice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setProfiles } from "../../src/features/profiles";
import axios from "axios";

export default function Header() {
  const dispatch = useDispatch();
  const auth = useSelector<any>((state) => state.auth.value);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<String | null>(null);
  const profile: any = useSelector<any>((state) => state.profiles.value);

  useEffect(() => {
    const cookie = document.cookie;
    cookie.split("; ").forEach((item) => {
      if (item.startsWith("token=")) {
        dispatch(signin(item.split("=")[1]));
      }
    });
  }, []);

  useEffect(() => {
    async function search() {
      if (searchValue === "") {
        const response = await axios.get(
          "http://localhost/api/get-all-profile"
        );
        dispatch(setProfiles(response.data));
        return;
      }

      const filtered = profile.filter((val: any) => {
        return val.name.startsWith(searchValue?.trim());
      });

      if (filtered.length !== 0) {
        dispatch(setProfiles(filtered));
        return;
      }

      if (filtered.length === 0) {
        const response = await axios.get(
          "http://localhost/api/get-all-profile"
        );
        dispatch(setProfiles(response.data));
        return;
      }
    }

    search();
  }, [searchValue]);

  const signout = () => {
    document.cookie = `token=; max-age=${0}`;
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="flex bg-orange-500 text-white  sm:py-2 py-1 px-6 justify-between items-center space-x-10">
      <Link href="/">
        <a className="text-lg tracking-wide text-white font-slab">AIS</a>
      </Link>{" "}
      <div className="hidden sm:block flex-1">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 w-full outline-none focus:border-white bg-transparent placeholder:text-white"
        />
      </div>
      <section className="hidden sm:block space-x-7">
        {auth ? (
          <>
            <Link href="/chat">
              <a className="hover:underline underline-offset-1 decoration-dotted">
                <SendIcon className="text-white " />
              </a>
            </Link>
            <Link href="/profile">
              <a className="hover:underline underline-offset-1 decoration-dotted">
                Profile
              </a>
            </Link>{" "}
            <button onClick={signout} className="bg-white text-orange-500 px-2">
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
