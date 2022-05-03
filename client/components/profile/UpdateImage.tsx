import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../src/features/aluminiSlice";
import Loading from "../common/Loading";
import { formDataType } from "./formDataType";

export default function UpdateImage({ url }: { url: string }) {
  const token = useSelector<any>((state) => state.auth.value);
  const dispatch = useDispatch();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null!);

  async function submitHandler(e: SyntheticEvent) {
    e.preventDefault();
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8000/api/update-image", true);

    xhr.upload.addEventListener("progress", (e) => {
      console.log(Math.ceil((e.loaded / e.total) * 100));
    });

    xhr.setRequestHeader("Authorization", "Bearer " + token);

    const data = new FormData(formRef?.current);
    xhr.send(data);

    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const res = this.response;

        setLoading(true);

        location.reload();
        if (!res.error) {
          dispatch(setProfile(res.link));
          return;
        }
      }
    };
  }

  function imageHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const path = e.target.value;
    const name = path.split("\\")[2];
    setImage(name);
    // openFile(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <form
      ref={formRef}
      onSubmit={submitHandler}
      className="w-60 flex-shrink-0 mx-auto mt-5 sm:mt-5 sm:ml-5 "
    >
      {image ? (
        <p className="text-center p-3 w-60 h-56 grid content-center shadow">
          {image}
        </p>
      ) : (
        <img
          src={`${url}`}
          className="w-60 h-56 object-cover flex items-center justify-center"
          alt="Not found"
        />
      )}
      <button className="text-center relative bg-orange-500 text-white  w-full py-2 px-3 mt-4 transition-all duration-200 hover:ring-2 ring-orange-500 ring-offset-2">
        <span>Change</span>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          className=" absolute w-full h-full top-0 left-0 opacity-0 "
        />
      </button>
      {image && (
        <button
          type="submit"
          className="text-center relative bg-orange-500 text-white  w-full py-2 mt-4 transition-all duration-200 hover:ring-2 ring-orange-500 ring-offset-2"
        >
          Update
        </button>
      )}
    </form>
  );
}
