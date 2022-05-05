import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../src/features/aluminiSlice";
import MessageCard from "./MessageCard";

export default function Notification() {
  const token = useSelector<any>((state) => state.auth.value);
  const dispatch = useDispatch();
  const profile: any = useSelector<any>((state) => state.alumini.value);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

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

      console.log(response.data);

      dispatch(setProfile(response.data));
    }
    if (token) getProfile();
  }, [token]);

  async function sendMessage(e: SyntheticEvent) {
    e.preventDefault();
    setMessage("");
    if (message?.trim() !== "") {
      const res = await axios.post("http://localhost:8000/api/set-message", {
        name: profile?.name,
        message,
      });
      console.log(res.data);
    }
  }

  return (
    <section className="flex justify-around px-4 py-2 h-[90%]">
      <main className="w-2/3 shadow bg-zinc-50">
        <MessageCard name={profile?.name} message="hello" />
      </main>
      <form
        onSubmit={sendMessage}
        className="h-full justify-center flex flex-col p-2"
      >
        <input
          value={message!}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          className="border  w-[300px] p-1 outline-none focus:border-orange-500 "
        />
        <button className="bg-orange-500 w-full py-1 text-white  border border-orange-400 hover:bg-orange-600 hover:tracking-widest transition-all duration-150">
          Send
        </button>
      </form>
    </section>
  );
}
