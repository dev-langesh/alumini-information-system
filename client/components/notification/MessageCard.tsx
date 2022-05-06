import React, { forwardRef } from "react";

export default function MessageCard({
  name,
  message,
  user,
}: {
  name: string;
  message: string;
  user: string;
}) {
  return (
    <div
      className={`p-2 bg-white shadow m-2 w-[200px] text-sm md:text-md md:w-[300px] ${
        user === name && "self-end"
      }`}
    >
      <span className="text-sm text-orange-500 pb-2 inline-block">{name}</span>
      <br />
      <span>{message}</span>
    </div>
  );
}
