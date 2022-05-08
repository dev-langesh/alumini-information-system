import { IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

export default function PastRecords({
  records,
  type,
}: {
  records: string;
  type?: string;
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
    setValue(records);
  }, [records]);

  async function updateHandler() {
    const res = await axios.post("http://localhost/api/update-profile", {
      records: value,
      token,
    });
    setEdit(false);
    if (res.data.error) {
      setError(res.data.error);
    }
  }

  return (
    <section className="m-5 md:ml-0 flex items-center flex-col flex-shrink-1 ">
      <div className="w-full lg:w-[400px] h-[200px] shadow md:ml-5 p-4 relative">
        <h1 className="text-orange-500">Past Records</h1>
        {edit ? (
          <textarea
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-full  outline-none   p-2"
          ></textarea>
        ) : (
          <p className="text-slate-500">{value ? value : "No Records"}</p>
        )}
        <footer className="absolute bottom-2 right-2">
          {type === "view" ? null : edit ? (
            <>
              <IconButton onClick={updateHandler} sx={{ color: "orange" }}>
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setValue(records);
                  setEdit(false);
                }}
                sx={{ color: "red" }}
              >
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={() => {
                setEdit(true);
              }}
              sx={{ color: "orange" }}
            >
              <EditIcon />
            </IconButton>
          )}
        </footer>
      </div>
    </section>
  );
}
