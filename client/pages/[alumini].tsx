import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Alumini() {
  const router = useRouter();

  const { alumini: id } = router.query;
  return <div>Alumini</div>;
}
