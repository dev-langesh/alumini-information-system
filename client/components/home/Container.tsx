import React, { useEffect } from "react";
import AluminiCard from "./AluminiCard";
import SearchAlumini from "./SearchAlumini";
import { useSelector } from "react-redux";

export default function Container() {
  const state: any = useSelector<any>((state) => state.alumini.value);

  return (
    <main className="h-full overflow-auto pb-20 sm:grid grid-cols-12 gap-2">
      <SearchAlumini />
      {state.map((item: any) => {
        return <AluminiCard key={item.id} {...item} />;
      })}
    </main>
  );
}