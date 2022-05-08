import React, { useEffect, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Error from "../../components/common/Error";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

type formtype = {
  password: string;
  confirmPassword: string;
};

interface inputType {
  id: number;
  placeholder: string;
  name: string;
}

const inputObj: inputType[] = [
  {
    id: 1,
    placeholder: "Enter New Password",
    name: "password",
  },
  {
    id: 2,
    placeholder: "Confirm Password",
    name: "confirmPassword",
  },
];

export default function ChangePassword() {
  const [formdata, setFormdata] = useState<formtype>({} as formtype);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const { id } = router.query;

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
    if (formdata.password !== formdata.confirmPassword) {
      setError("Password Doesn't match");
      return;
    }
    console.log(id);
    const response = await axios.put(
      "http://localhost/api/user/change-forgot-password",
      {
        id,
        password: formdata.confirmPassword,
      }
    );
    const data = response.data;
    if (data.error) {
      setError(data.error);
      return;
    }
    router.push("/login");
  };

  return (
    <>
      <Error error={error} />
      <section className="pt-12">
        <form
          onSubmit={submitHandler}
          className="w-11/12 sm:w-[400px] mx-auto p-4 shadow-xl space-y-8"
        >
          {inputObj.map((item) => {
            return (
              <div key={item.id} className=" relative w-full">
                <input
                  {...item}
                  id={`${item.id}`}
                  type={
                    item.name === "email"
                      ? "text"
                      : showPassword
                      ? "text"
                      : "password"
                  }
                  onChange={changeHandler}
                  className={`border px-4 py-2 w-full block focus:border-orange-500 outline-none relative`}
                />
                {item.name !== "email" && (
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
                )}
              </div>
            );
          })}

          <button className="px-6 py-2 w-full bg-orange-500 text-white  cursor-pointer hover:ring-2 ring-orange-500 ring-offset-2">
            Change Password
          </button>
        </form>
      </section>
    </>
  );
}
