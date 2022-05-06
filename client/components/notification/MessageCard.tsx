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
      className={`p-2 bg-white shadow m-2 w-[200px] text-sm md:text-md md:w-[300px] lg:w-[350px] break-words rounded-sm  ${
        user === name
          ? "self-end p-3 bg-orange-600 text-white text-md rounded-br-2xl  rounded-tl-2xl"
          : " rounded-bl-2xl rounded-tr-2xl shadow-orange-500/30 "
      }`}
    >
      {user !== name && (
        <>
          <span className="text-sm text-orange-500 pb-2 inline-block">
            {name}
          </span>
          <br />
        </>
      )}
      <span>{message}</span>
    </div>
  );
}
