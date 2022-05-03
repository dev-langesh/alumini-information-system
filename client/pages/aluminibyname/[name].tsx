import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import AluminiCard from "../../components/home/AluminiCard";

export default function Alumini({ data }: any) {
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <section className="grid grid-cols-12 gap-8 ">
      {data.map((item: any) => {
        return <AluminiCard key={`${item.id}`} {...item} />;
      })}
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(`http://localhost:8000/api/get-all-profile`);

  const paths = response.data.map((item: any) => {
    return {
      params: {
        name: item.name,
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
    `http://localhost:8000/api/get-alumini-by-name/${params?.name}`
  );

  return {
    props: { data: response.data },
  };
};
