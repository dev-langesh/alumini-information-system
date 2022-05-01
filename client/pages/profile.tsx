import { useLayoutEffect } from "react";
import Profile from "../components/profile/Profile";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signin } from "../src/features/authSlice";

export default function profile() {
  const dispatch = useDispatch();
  const router = useRouter();

  useLayoutEffect(() => {
    const cookie = document.cookie;
    cookie.split("; ").forEach((item) => {
      if (item.startsWith("token=")) {
        dispatch(signin(item.split("=")[1]));
      } else {
        router.push("/register");
      }
    });
  }, []);

  return (
    <>
      <Profile />
    </>
  );
}
