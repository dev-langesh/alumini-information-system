import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { open } from "../../src/features/sidebarSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();

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
        <Link href="/register">
          <a className="hover:underline underline-offset-1 decoration-dotted">
            Register
          </a>
        </Link>{" "}
        <Link href="/profile">
          <a className="hover:underline underline-offset-1 decoration-dotted">
            Profile
          </a>
        </Link>{" "}
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
