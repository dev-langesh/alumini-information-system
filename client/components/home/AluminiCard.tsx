import Link from "next/link";
import React from "react";

export type aluminiType = {
  id: string;
  name: string;
  image: string;
  country: string;
  role: string;
  company: string;
  batch: string;
};

export default function AluminiCard({
  id,
  name,
  image,
  country,
  role,
  company,
  batch,
}: aluminiType) {
  return (
    <section className="flex space-x-4 items-center p-4 shadow my-2">
      <img
        src={`${image}`}
        alt="image not found"
        className="w-24 h-32 object-cover rounded-full "
      />
      <div className="w-autl border-l border-slate-200 pl-3">
        <h1 className="text-lg text-orange-500 font-slab">{name}</h1>
        <p className="text-slate-500">{role}</p>
        <p className="text-slate-700">
          {company} - {country}
        </p>
        <p>{batch}</p>
        <Link href={`${id}`}>
          <a className="py-[2px] px-3 mt-1 w-24 text-sm inline-block text-center  bg-orange-500 text-white border border-orange-500 hover:bg-white hover:text-orange-500 hover:ring ring-orange-100 transition duration-200">
            More
          </a>
        </Link>
      </div>
    </section>
  );
}
