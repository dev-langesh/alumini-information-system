import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Container from "../components/home/Container";
import { setProfiles } from "../src/features/profiles";

const Home: NextPage = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProfiles(props.data));
  }, [props]);

  return <Container />;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("http://localhost/api/get-all-profile");
  return {
    props: { data: response.data },
    revalidate: 5,
  };
};
