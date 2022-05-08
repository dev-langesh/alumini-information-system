import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import Error from "../common/Error";
import { spawn } from "child_process";

export default function Card({
  value,
  fieldName,
  type,
}: {
  value: string;
  fieldName: string;
  type?: string;
}) {
  const [edit, setEdit] = useState<null | boolean>(null);
  const [formValue, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector<any>((state) => state.auth.value);

  useEffect(() => {
    if (error) {
      setValue(value);
    }
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error]);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function updateHandler(e: any) {
    const res = await axios.post("http://localhost:8000/api/update-profile", {
      [fieldName.toLocaleLowerCase()]: formValue,
      token,
    });
    if (res.data.error) {
      setError(res.data.error);
    }
  }

  return (
    <div
      className={`shadow px-3 ${
        type === "view" ? "py-4" : "py-1"
      } flex w-full justify-between items-center`}
    >
      {error && <Error error={error} />}
      {edit ? (
        <input
          onChange={changeHandler}
          autoFocus
          placeholder={fieldName}
          className="w-11/12 outline-none text-orange-500"
        />
      ) : fieldName === "linkedin" ? (
        <a
          className="hover:underline w-full inline-block"
          target="_black"
          href={`${value}`}
        >
          {formValue ? formValue : value}
        </a>
      ) : value ? (
        <span>{formValue ? formValue : value}</span>
      ) : null}
      {type !== "view" ? (
        <aside className="ml-3 flex py-1">
          {edit ? (
            <>
              <IconButton sx={{ color: "orange" }}>
                <CheckIcon
                  onClick={(e: any) => {
                    updateHandler(e);
                    setEdit(null);
                  }}
                />
              </IconButton>
              <IconButton
                sx={{ color: "red" }}
                onClick={() => {
                  setValue(value);
                  setEdit(null);
                }}
              >
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                sx={{ color: "orange" }}
                onClick={() => setEdit(true)}
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </aside>
      ) : null}
    </div>
  );
}
