import Link from "next/link";
import React from "react";

export default function VerifyEmail() {
  return (
    <section className="p-4 flex flex-col shadow bg-white">
      <p>
        We sent an email to you. Click the link in that email then you will be
        authenticated
      </p>
      <Link href="http://www.gmail.com">
        <a
          target="_blank"
          ref="norefferal"
          className="text-sm text-slate-400 hover:underline underline-offset-1 text-center block pt-3"
        >
          Go To Gmail
        </a>
      </Link>
    </section>
  );
}
