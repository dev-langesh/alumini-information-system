import React, { useEffect, useState } from "react";
import axios from "axios";
import Error from "../common/Error";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { setProfiles } from "../../src/features/profiles";

export default function Form() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const profile: any = useSelector<any>((state) => state.profiles.value);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    async function search() {
      if (value === "") {
        const response = await axios.get(
          "http://localhost:8000/api/get-all-profile"
        );
        dispatch(setProfiles(response.data));
        return;
      }

      const filtered = profile.filter((val: any) => {
        return val.name.startsWith(value.trim());
      });

      if (filtered.length !== 0) {
        dispatch(setProfiles(filtered));
        return;
      }

      if (filtered.length === 0) {
        const response = await axios.get(
          "http://localhost:8000/api/get-all-profile"
        );
        dispatch(setProfiles(response.data));
        return;
      }
    }

    search();
  }, [value]);

  return (
    <div className="sm:hidden">
      <Error error={error} />
      <section className="flex items-center flex-col us:flex-row ">
        <Input
          value={value}
          handleChange={(event) => {
            setValue(event.target.value);
            setError("");
          }}
        />
      </section>
    </div>
  );
}
