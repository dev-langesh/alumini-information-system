import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import PastRecords from "./PastRecord";
import UpdateDescription from "./UpdateDescription";
import UpdateImage from "./UpdateImage";

export default function ShowProfile() {
  const profile: any = useSelector<any>((state) => state.alumini.value);

  return (
    <article className="flex w-full flex-col sm:flex-row ">
      <UpdateImage url={profile.img} />
      <main className="flex lg:flex-row flex-col flex-1">
        <section className="flex flex-col  w-full flex-1 p-5  space-y-3">
          <Card fieldName={"Name"} value={profile.name}></Card>
          <Card fieldName={"Email"} value={profile.email}></Card>
          <Card fieldName={"Phone"} value={profile.phone}></Card>
          <Card fieldName={"Degree"} value={profile.degree}></Card>
          <Card fieldName={"Batch"} value={profile.batch}></Card>
          <Card fieldName={"Company"} value={profile.company}></Card>
          <Card fieldName={"Location"} value={profile.location}></Card>
          <Card fieldName={"Job"} value={profile.job}></Card>
          <Card fieldName="linkedin" value={profile.linkedin}></Card>
        </section>
        <footer>
          <PastRecords records={profile.records} />
          <UpdateDescription description={profile.description} />
        </footer>
      </main>
    </article>
  );
}
