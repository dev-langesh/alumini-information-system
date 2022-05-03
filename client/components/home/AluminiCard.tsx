import Link from "next/link";
import React from "react";

export type aluminiType = {
  _id: string;
  name: string;
  image: string;
  country: string;
  job: string;
  company: string;
  batch: string;
  description: string;
  img: string;
};

export default function AluminiCard({
  _id,
  name,
  job,
  description,
  img,
}: aluminiType) {
  return (
    <article className="flex space-x-4 items-center p-4 shadow col-span-12 md:col-span-6 ">
      <a href={img} target="_blank">
        <img
          src={`${img}`}
          alt="image not found"
          className="w-24 h-32 object-cover rounded "
        />
      </a>
      <section className="w-auto  pl-3 flex-shrink-0">
        <h1 className="text-lg text-orange-500 font-slab">{name}</h1>
        <p className="text-slate-600">{job}</p>

        <Link href={`/alumini/${_id}`}>
          <a className="py-[2px] px-3 mt-3 mb-2 min-w-20 text-sm inline-block text-center  bg-orange-500 text-white border border-orange-500 hover:bg-white hover:text-orange-500 hover:ring ring-orange-100 transition duration-200">
            About
          </a>
        </Link>
      </section>
      <section className="hidden xl:block pl-3 h-full flex-1 border-slate-700 p-2 text-slate-800 border-l bg-slate-50 text-sm">
        <p>{description}</p>
      </section>
    </article>
  );
}
