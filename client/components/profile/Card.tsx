import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import Error from "../common/Error";

export default function Card({
  children,
  fieldName,
  type,
}: {
  children: string;
  fieldName: string;
  type?: string;
}) {
  const [edit, setEdit] = useState<null | boolean>(null);
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector<any>((state) => state.auth.value);
  useEffect(() => {
    if (error) {
      setValue(children);
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
      [fieldName]: value,
      token,
    });
    if (res.data.error) {
      setError(res.data.error);
    }
  }

  return (
    <div
      className={`shadow px-3 ${
        type === "view" ? "py-2" : "py-1"
      } flex w-full justify-between items-center`}
    >
      {error && <Error error={error} />}
      {edit ? (
        <input
          onChange={changeHandler}
          autoFocus
          placeholder={children}
          className="w-11/12 outline-none text-orange-500"
        />
      ) : (
        <span>{value ? value : children}</span>
      )}
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
                  setValue(children);
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
