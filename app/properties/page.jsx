import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      {" "}
      <h1 className=" text-3xl">Properties</h1>
      <Link href={"/"}>Go Home</Link>
    </div>
  );
};

export default page;
