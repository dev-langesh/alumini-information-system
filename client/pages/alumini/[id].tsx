import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import Card from "../../components/profile/Card";
import UpdateImage from "../../components/profile/UpdateImage";
import UpdateDescription from "../../components/profile/UpdateDescription";
import PastRecords from "../../components/profile/PastRecord";

export default function Alumini(props: any) {
  return (
    <article className="flex w-full flex-col sm:flex-row ">
      <UpdateImage type="view" url={props.img} />
      <main className="flex lg:flex-row flex-col flex-1">
        <section className="flex flex-col  w-full flex-1 p-5  space-y-3">
          <Card type="view" fieldName={"Name"} value={props.name}></Card>
          <Card type="view" fieldName={"Email"} value={props.email}></Card>
          <Card type="view" fieldName={"Phone"} value={props.phone}></Card>
          <Card type="view" fieldName={"Degree"} value={props.degree}></Card>
          <Card type="view" fieldName={"Batch"} value={props.batch}></Card>
          <Card type="view" fieldName={"Company"} value={props.company}></Card>
          <Card
            type="view"
            fieldName={"Location"}
            value={props.location}
          ></Card>
          <Card type="view" fieldName={"Job"} value={props.job}></Card>
          <Card type="view" fieldName="linkedin" value={props.linkedin}></Card>
        </section>
        <footer>
          <PastRecords type="view" records={props.records} />
          <UpdateDescription type="view" description={props.description} />
        </footer>
      </main>
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(`http://localhost/api/get-all-profile`);

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
    `http://localhost/api/alumini/${params?.id}`
  );

  return {
    props: response.data,
    revalidate: 5,
  };
};
