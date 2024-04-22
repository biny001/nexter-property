import React from "react";
import Link from "next/link";

const InfoBox = ({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  link,
  children,
}) => {
  return (
    <div className={` ${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={link}
        className={`inline-block bg-black  ${textColor} rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {buttonInfo}
      </Link>
    </div>
  );
};

export default InfoBox;
