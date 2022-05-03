import React, { createContext, useEffect, useState } from "react";
import AluminiCard from "./AluminiCard";
import SearchAlumini from "./SearchAlumini";
import { useSelector } from "react-redux";

export default function Container() {
  const data = useSelector((state: any) => state.profiles.value);
  return (
    <main className=" pb-20 sm:grid grid-cols-12 gap-6 ">
      <SearchAlumini />
      {data.lengeth === 0 ? (
        <div className="w-screen h-full grid place-content-center text-xl">
          No Profile Data
        </div>
      ) : (
        data.map((item: any) => {
          return <AluminiCard key={item._id} {...item} />;
        })
      )}
    </main>
  );
}
