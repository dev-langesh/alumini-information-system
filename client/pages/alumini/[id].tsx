import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import Card from "../../components/profile/Card";
import UpdateImage from "../../components/profile/UpdateImage";
import UpdateDescription from "../../components/profile/UpdateDescription";

export default function Alumini(props: any) {
  return (
    <article className="flex w-full flex-col sm:flex-row ">
      <UpdateImage type="view" url={props.img} />
      <main className="flex lg:flex-row flex-col flex-1">
        <section className="flex flex-col  w-full flex-1 p-5  space-y-3">
          <Card type="view" fieldName={"name"}>
            {props.name}
          </Card>
          <Card type="view" fieldName={"job"}>
            {props.job}
          </Card>
          <Card type="view" fieldName={"degree"}>
            {props.degree}
          </Card>
          <Card type="view" fieldName={"batch"}>
            {props.batch}
          </Card>
          <Card type="view" fieldName={"company"}>
            {"Company : " + props.company}
          </Card>
          <Card type="view" fieldName={"location"}>
            {props.location}
          </Card>
          <Card type="view" fieldName={"email"}>
            {props.email}
          </Card>
          <Card type="view" fieldName={"phone"}>
            {props.phone}
          </Card>
        </section>
        <UpdateDescription type="view" description={props.description} />
      </main>
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(`http://localhost:8000/api/get-all-profile`);

  const paths = response.data.map((item: any) => {
    return {
      params: {
        id: item._id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const response = await axios.get(
    `http://localhost:8000/api/alumini/${params?.id}`
  );

  return {
    props: response.data,
    revalidate: 5,
  };
};
