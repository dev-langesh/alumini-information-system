import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MessageCard({
  name,
  message,
}: {
  name: string;
  message: string;
}) {
  return (
    <div className="p-2 bg-white m-2 w-[300px]">
      <span className="text-sm text-orange-500 pb-2 inline-block">{name}</span>
      <br />
      <span>{message}</span>
    </div>
  );
}
