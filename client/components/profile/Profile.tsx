import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { inputObj } from "./inputData";
import UploadImage from "./UploadImage";
import { formDataType } from "./formDataType";
import { useSelector } from "react-redux";
import Error from "../common/Error";

export default function profile() {
  const [formData, setFormData] = useState<formDataType>({} as formDataType);
  const [error, setError] = useState<string>("");
  const token = useSelector<any>((state) => state.auth.value);

  const formRef = useRef<HTMLFormElement>(null!);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
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

    const formData = new FormData(formRef?.current);
    xhr.send(formData);

    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const res = JSON.parse(this.response);
        if (res.error) {
          setError(res.error);
        }
      }
    };
  }

  return (
    <>
      {error && <Error error={error} />}
      <form
        ref={formRef}
        onSubmit={submitHandler}
        className="flex flex-col sm:flex-row p-4 w-screen h-screen overflow-auto pb-20"
      >
        <UploadImage />

        <section className="space-y-3 pt-6 flex flex-col  content-center w-full sm:w-[350px]">
          {inputObj.map((item) => {
            return (
              <input
                type="text"
                onChange={changeHandler}
                className="border block px-4 py-2 focus:border focus:border-orange-500 focus:ring ring-orange-100 outline-none w-full"
                key={item.id}
                {...item}
                id={item.id.toString()}
              />
            );
          })}
          <button
            type="submit"
            className="bg-orange-500 p-2 text-white text-center border border-orange-500  hover:ring ring-orange-500 ring-offset-2  tracking-wider"
          >
            Submit
          </button>
        </section>
      </form>
    </>
  );
}
