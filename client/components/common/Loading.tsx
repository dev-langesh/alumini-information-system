import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading({ className }: { className?: any }) {
  return (
    <section
      className={
        className
          ? className
          : "grid w-full h-full place-items-center absolute top-0 left-0 z-50 bg-white"
      }
    >
      <CircularProgress sx={{ color: "orange" }} />
    </section>
  );
}
