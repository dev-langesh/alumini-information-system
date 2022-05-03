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
  description: string;
};

export default function AluminiCard({
  id,
  name,
  image,
  country,
  role,
  company,
  batch,
  description,
}: aluminiType) {
  return (
    <article className="flex space-x-4 items-center p-4 shadow col-span-12 md:col-span-6 ">
      <img
        src={`${image}`}
        alt="image not found"
        className="w-24 h-32 object-cover rounded-full "
      />
      <section className="w-auto border-l border-slate-200 pl-3 flex-shrink-0">
        <h1 className="text-lg text-orange-500 font-slab">{name}</h1>
        <p className="text-slate-600">{role}</p>

        <Link href={`${id}`}>
          <a className="py-[2px] px-3 mt-3 mb-2 w-full text-sm inline-block text-center  bg-orange-500 text-white border border-orange-500 hover:bg-white hover:text-orange-500 hover:ring ring-orange-100 transition duration-200">
            About
          </a>
        </Link>
      </section>
      <section className="hidden xl:block pl-2">
        <p>{description}</p>
      </section>
    </article>
  );
}
