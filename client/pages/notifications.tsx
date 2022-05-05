import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Notification from "../components/notification/Notification";
import { setMessages } from "../src/features/notification";

export default function Notifications(props: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMessages(props.data));
  }, [props]);

  return <Notification />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get("http://localhost:8000/api/get-messages");

  const data = response.data;

  return {
    props: { data },
  };
};
