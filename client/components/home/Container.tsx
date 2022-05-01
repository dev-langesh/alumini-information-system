import React from "react";
import AluminiCard from "./AluminiCard";
import { aluminiData } from "./data";
import SearchAlumini from "./SearchAlumini";

export default function Container() {
  return (
    <main className="h-full">
      <SearchAlumini />
      {aluminiData.map((item) => {
        return <AluminiCard key={item.id} {...item} />;
      })}
    </main>
  );
}
