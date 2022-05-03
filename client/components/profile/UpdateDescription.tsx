import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UpdateDescription({
  description,
}: {
  description: string;
}) {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>();
  const token = useSelector<any>((state) => state.auth.value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
    }
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error]);

  useEffect(() => {
    setValue(description);
  }, [description]);

  async function updateHandler(e: any) {
    const res = await axios.post("http://localhost:8000/api/update-profile", {
      description: value,
      token,
    });
    setEdit(false);
    if (res.data.error) {
      setError(res.data.error);
    }
  }

  return (
    <section className="m-5 md:ml-0 flex items-center flex-col flex-shrink-1 ">
      <div className="w-full lg:w-[400px] h-[200px] shadow  p-4 ">
        {edit ? (
          <textarea
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-full border outline-none  focus:border-orange-500 p-2"
          ></textarea>
        ) : (
          <p className="text-slate-500">{value ? value : "No Description"}</p>
        )}
      </div>
      {edit ? (
        <>
          <button
            onClick={updateHandler}
            className="text-center bg-orange-500 text-white  w-full py-2 mt-4 transition-all duration-200 hover:ring-2 ring-orange-500 ring-offset-2"
          >
            update Description
          </button>
          <button
            onClick={() => {
              setValue(description);
              setEdit(false);
            }}
            className="text-center bg-orange-500 text-white  w-full py-2 mt-4 transition-all duration-200 hover:ring-2 ring-orange-500 ring-offset-2"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            setValue(description);
            setEdit(true);
          }}
          className="text-center bg-orange-500 text-white  w-full py-2 mt-4 transition-all duration-200 hover:ring-2 ring-orange-500 ring-offset-2"
        >
          Change Description
        </button>
      )}
    </section>
  );
}
