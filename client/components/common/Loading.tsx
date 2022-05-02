import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <section className="grid w-full h-full place-items-center">
      <CircularProgress />
    </section>
  );
}
