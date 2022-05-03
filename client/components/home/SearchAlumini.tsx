import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Error from "../common/Error";
import Input from "./Input";

export default function Form() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (value === "") {
      setError("Enter The Name");
      return;
    }

    setError("");

    setValue("");

    setLoading(true);

    router.push(`/aluminibyname/${value}`);
  };

  return (
    <form onSubmit={handleSubmit} className="sm:hidden">
      <Error error={error} />
      <section className="flex items-center flex-col us:flex-row ">
        <Input
          value={value}
          handleChange={(event) => {
            setValue(event.target.value);
            setError("");
          }}
        />
        <button
          className="bg-amber-500 py-2 px-6 us:mt-0 us:ml-2 text-white block w-full  us:w-auto shadow-md"
          type="submit"
        >
          {loading ? "Loading..." : "Find"}
        </button>
      </section>
    </form>
  );
}
