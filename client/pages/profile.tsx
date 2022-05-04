import { useEffect, useLayoutEffect } from "react";
import Profile from "../components/profile/Profile";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signin } from "../src/features/authSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
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
