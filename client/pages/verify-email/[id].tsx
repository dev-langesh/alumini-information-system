import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../src/features/authSlice";

export default function VerifyEmail({ token }: { token: string }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(token);
    document.cookie = `token=${token}; max-age=${60 * 60 * 24 * 60}`;
    dispatch(signin(token));
    router.push("/profile");
  }, [token]);

  return (
    <div className="text-center p-4 text-lg tracking-wider">Email Verified</div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const res = await axios.get(
    `http://localhost:8000/api/user/verify-email/${params?.id}`
  );

  console.log(res.data);

  return {
    props: { token: res.data.token },
  };
};
