import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../src/features/aluminiSlice";
import Error from "../common/Error";
import { formDataType } from "./formDataType";
import { inputObj } from "./inputData";
import UploadImage from "./UploadImage";

export default function CreateProfile() {
  const [formData, setFormData] = useState<formDataType>({} as formDataType);
  const [error, setError] = useState<string>("");
  const token = useSelector<any>((state) => state.auth.value);
  const dispatch = useDispatch();

  const formRef = useRef<HTMLFormElement>(null!);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  function changeHandler(e: React.ChangeEvent<any>) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function submitHandler(e: SyntheticEvent) {
    e.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8000/api/upload", true);

    xhr.upload.addEventListener("progress", (e) => {
      console.log(Math.ceil((e.loaded / e.total) * 100));
    });

    xhr.setRequestHeader("Authorization", "Bearer " + token);

    const data = new FormData(formRef?.current);

    xhr.send(data);

    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const res = JSON.parse(this.response);

        console.log(res);

        if (!res.error) {
          dispatch(setProfile(formData));
          location.reload();
          return;
        }

        setError(res.error);
      }
    };
  }

  return (
    <>
      {error && <Error error={error} />}
      <form
        ref={formRef}
        onSubmit={submitHandler}
        className="flex flex-col sm:flex-row p-4 w-screen h-auto overflow-auto md:space-x-6"
      >
        <UploadImage />

        <section className="space-y-3 pt-6 pr-4 flex flex-col flex-1  content-center w-full sm:w-[350px]">
          {inputObj.map((item) => {
            return (
              <input
                type="text"
                onChange={changeHandler}
                className="border block px-4 py-2 focus:border focus:border-orange-500 focus:ring ring-orange-50 outline-none w-full"
                key={item.id}
                {...item}
                id={item.id.toString()}
              />
            );
          })}
          <textarea
            name="description"
            cols={80}
            rows={40}
            onChange={changeHandler}
            placeholder="About You..."
            className="border focus:border-orange-500 focus:ring ring-orange-100 outline-none p-4 mt-6 !h-40 w-full lg:hidden block "
          ></textarea>
          <button
            type="submit"
            className="bg-orange-500 p-2 text-white text-center border border-orange-500  hover:ring-2 ring-orange-500 ring-offset-2  tracking-wider"
          >
            Submit
          </button>
        </section>
        <textarea
          name="description"
          onChange={changeHandler}
          placeholder="About You..."
          className="border focus:border-orange-500 focus:ring ring-orange-100 outline-none p-4 ml-6 mt-6 !h-40 w-96 hidden lg:block "
        ></textarea>
      </form>
    </>
  );
}
