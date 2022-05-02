import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProfile } from "../../src/features/aluminiSlice";
import Loading from "../common/Loading";
import ShowProfile from "./ShowProfile";
import CreateProfile from "./CreateProfile";

export default function profile() {
  const [error, setError] = useState<string>("");
  const token = useSelector<any>((state) => state.auth.value);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const profile = useSelector<any>((state) => state.alumini.value);

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

      setLoading(false);

      console.log(response.data);
      dispatch(setProfile(response.data));
    }
    if (token) getProfile();
  }, [token]);

  return (
    <>
      {loading && <Loading />}
      {profile ? <ShowProfile /> : <CreateProfile />}
    </>
  );
}
