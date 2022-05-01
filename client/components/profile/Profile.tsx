import React, { SyntheticEvent, useRef, useState } from "react";
import { inputObj } from "./inputData";
import UploadImage from "./UploadImage";
import { formDataType } from "./formDataType";

export default function profile() {
  const [formData, setFormData] = useState<formDataType>({} as formDataType);

  const formRef = useRef<HTMLFormElement>(null!);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function submitHandler(e: SyntheticEvent) {
    e.preventDefault();
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8000/api/upload", true);

    xhr.upload.addEventListener("progress", (e) => {
      console.log(Math.ceil((e.loaded / e.total) * 100));
    });

    const formData = new FormData(formRef?.current);
    xhr.send(formData);
  }

  return (
    <>
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
