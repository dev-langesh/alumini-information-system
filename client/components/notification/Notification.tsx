import axios from "axios";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../src/features/aluminiSlice";
import { setMessages } from "../../src/features/notification";
import MessageCard from "./MessageCard";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

export default function Notification() {
  const token = useSelector<any>((state) => state.auth.value);
  const profile: any = useSelector<any>((state) => state.alumini.value);
  const messages: any = useSelector<any>((state) => state.messages.value);
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
      socket.on("receive_message", (data) => {
        dispatch(setMessages(data));
      });
    });
  }, [socket]);

  useEffect(() => {
    async function getProfile() {
      const response = await axios.get(
        "http://localhost:8000/api/get-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setProfile(response.data));
    }
    if (token) getProfile();
  }, [token]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendMessage(e: SyntheticEvent) {
    e.preventDefault();
    setMessage("");
    scrollToBottom();
    const msg = {
      name: profile?.name,
      message: message.trim(),
    };
    const updatedMessage = JSON.parse(JSON.stringify(messages));
    updatedMessage.push({
      _id: Math.ceil(Math.random() * 10000 + Math.random() * 10000),
      user: profile?.name,
      message: message.trim(),
    });

    dispatch(setMessages(updatedMessage));

    socket.emit("send_message", msg);
  }

  function scrollToBottom() {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }

  return (
    <section className="flex justify-around  h-[90%] flex-col  w-full  ">
      <main className=" overflow-auto w-full scroll-smooth hide-scroll flex flex-col ">
        {messages.map((item: any) => {
          return (
            <MessageCard
              key={item._id}
              name={item.user}
              user={profile?.name}
              message={item.message}
            />
          );
        })}
        <div
          ref={scrollRef}
          className=" invisible h-40 float-right clear-right"
        ></div>
      </main>
      <form
        onSubmit={sendMessage}
        className=" w-11/12 flex-col sm:flex-row sm:w-[500px] m-auto  justify-center flex mt-6  p-2"
      >
        <input
          value={message!}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          className="border w-full  p-1 outline-none focus:border-orange-500 "
        />
        <button className="bg-orange-600 w-full sm:w-32 py-1 text-white  border border-orange-400 hover:bg-orange-600 hover:tracking-widest transition-all duration-150">
          Send
        </button>
      </form>
    </section>
  );
}
