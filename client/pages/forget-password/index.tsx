import React, { useEffect, useState } from "react";
import Error from "../../components/common/Error";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signin } from "../../src/features/authSlice";
import axios from "axios";
import VerifyEmail from "../../components/auth/VerifyEmail";

type formtype = {
  email: string;
};

export default function ChangePassword() {
  const [formdata, setFormdata] = useState<formtype>({} as formtype);
  const [error, setError] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response = await axios.put(
      "http://localhost:8000/api/user/send-mail-to-change-forget-password",

      {
        email: formdata.email,
      }
    );
    const data = response.data;
    if (data.error) {
      setError(data.error);
      return;
    }
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-[400px]">
        <VerifyEmail />
      </section>
    );
  }

  return (
    <section className="pt-12">
      <form
        onSubmit={submitHandler}
        className="w-11/12 sm:w-[400px] mx-auto p-4 shadow-xl space-y-8"
      >
        <input
          type="text"
          onChange={changeHandler}
          name="email"
          placeholder="Enter email"
          className={`border px-4 py-2 w-full block focus:border-orange-500 outline-none relative`}
        />
        <button className="px-6 py-2 w-full bg-orange-500 text-white  cursor-pointer hover:ring-2 ring-orange-500 ring-offset-2">
          Verify Email
        </button>
      </form>
    </section>
  );
}
