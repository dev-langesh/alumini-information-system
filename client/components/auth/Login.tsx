import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Error from "../common/Error";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signin } from "../../src/features/authSlice";

type formtype = {
  email: string;
  password: string;
};

type inputObjType = {
  key: number;
  type: string;
  name: string;
  placeholder: string;
  value: string;
}[];

export default function Login() {
  const [formValue, setFormValue] = useState<formtype>({} as formtype);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>();
  const router = useRouter();
  const dispatch = useDispatch();

  const inputObj: inputObjType = [
    {
      key: 0,
      type: "text",
      name: "email",
      placeholder: "Emain",
      value: formValue.email,
    },
    {
      key: 1,
      type: "password",
      name: "password",
      placeholder: "Password",
      value: formValue.password,
    },
  ];

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!formValue.password || !formValue.email) {
      setError("Fill all the fields");
      return;
    }

    setLoading(true);
    const response: any = await axios.post(
      "http://localhost:8000/api/user/login",
      formValue
    );

    setLoading(false);

    if (response.data.error) {
      setError(response.data.error);
    } else {
      setMsg("Redirecting...");
      document.cookie = `token=${response.data.token}; max-age=${
        60 * 60 * 24 * 60
      }`;
      dispatch(signin(response.data.token));
      router.push("/profile");
    }
  }

  return (
    <>
      <Error error={error} />
      <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col shadow-lg us:px-10 p-5 justify-center w-screen sm:w-[300px] sm:h-auto rounded-lg"
        >
          <h1 className="text-3xl pb-8 font-slab text-center text-orange-500 tracking-wider">
            Login
          </h1>
          <main className="flex flex-col space-y-4 items-center justify-center">
            {inputObj.map((item) => {
              return (
                <div key={item.key} className=" relative w-full">
                  <input
                    {...item}
                    type={
                      item.type === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : "text"
                    }
                    onChange={handleChange}
                    autoComplete="off"
                    className={`border px-4 py-2 w-full block focus:border-orange-500 outline-none ${
                      item.type === "password" ? "relative" : null
                    }`}
                  />
                  {item.type === "password" ? (
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      sx={{ position: "absolute", top: "1px", right: "8px" }}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon sx={{ color: "orange" }} />
                      ) : (
                        <RemoveRedEyeIcon sx={{ color: "orange" }} />
                      )}
                    </IconButton>
                  ) : null}
                </div>
              );
            })}
            <button
              type="submit"
              className="px-6 py-2 w-full bg-orange-500 text-white  cursor-pointer hover:ring-2 ring-orange-500 ring-offset-2"
            >
              {loading ? "Loading..." : msg ? msg : "Submit"}
            </button>
          </main>
          <footer>
            <Link href="/forget-password">
              <a className="pt-4 inline-block hover:underline text-sm text-slate-500">
                {"Forget Password?"}
              </a>
            </Link>
            <br />
            <Link href="/register">
              <a className=" inline-block hover:underline text-sm text-slate-500">
                {"Don't have an account?"}
              </a>
            </Link>
          </footer>
        </form>
      </section>
    </>
  );
}
