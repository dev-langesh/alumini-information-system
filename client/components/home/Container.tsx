import React, { createContext, useEffect, useState } from "react";
import AluminiCard from "./AluminiCard";
import SearchAlumini from "./SearchAlumini";
import { useSelector } from "react-redux";

export default function Container() {
  const data = useSelector((state: any) => state.profiles.value);
  useEffect(() => {
    console.log(data);
  });
  return (
    <main className=" pb-20 sm:grid grid-cols-12 gap-6">
      <SearchAlumini />
      {data.length === 0 && (
        <div className=" text-lg text-slate-500 col-span-12 text-center p-8">
          No Profile Data
        </div>
      )}
      {data.map((item: any) => {
        return <AluminiCard key={item._id} {...item} />;
      })}
    </main>
  );
}
