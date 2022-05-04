import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import AluminiCard from "../../components/home/AluminiCard";
import Loading from "../../components/common/Loading";

export default function Alumini(props: any) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
      setLoading(false);
    }
  }, [props]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="grid grid-cols-12 gap-8 ">
      {data.length === 0 && (
        <div className=" text-lg text-slate-500 col-span-12 text-center p-8">
          No Profile Data
        </div>
      )}
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
    fallback: true,
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
