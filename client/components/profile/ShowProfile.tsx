import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import UpdateDescription from "./UpdateDescription";
import UpdateImage from "./UpdateImage";

export default function ShowProfile() {
  const dispatch = useDispatch();
  const profile: any = useSelector<any>((state) => state.alumini.value);

  useEffect(() => {
    console.log(profile);
  }, []);

  return (
    <article className="flex w-full flex-col sm:flex-row ">
      <UpdateImage url={profile.img} />
      <main className="flex lg:flex-row flex-col flex-1">
        <section className="flex flex-col  w-full flex-1 p-5  space-y-3">
          <Card fieldName={"name"}>{profile.name}</Card>
          <Card fieldName={"email"}>{profile.email}</Card>
          <Card fieldName={"phone"}>{profile.phone}</Card>
          <Card fieldName={"company"}>{profile.company}</Card>
          <Card fieldName={"location"}>{profile.location}</Card>
          <Card fieldName={"job"}>{profile.job}</Card>
          <Card fieldName={"degree"}>{profile.degree}</Card>
          <Card fieldName={"batch"}>{profile.batch}</Card>
        </section>
        <UpdateDescription description={profile.description} />
      </main>
    </article>
  );
}