// "use client";
import { fetchProperties } from "@/utils/requests";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
// import { useEffect, useState } from "react";

const HomeProperties = async () => {
  const properties = await fetchProperties();

  // useEffect(() => {
  //   const getProperties = async () => {

  //     setProperties(properties);
  //   };
  //   getProperties();
  // }, []);

  const recentProperties = Array.isArray(properties)
    ? properties
        .slice() // Make a shallow copy of properties array
        .sort(() => Math.random() - Math.random())
        .slice(0, 3)
    : []; // Default value if properties is not an array or is falsy

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties.length === 0 ? (
              <p>Properties not found</p>
            ) : (
              recentProperties.map((property) => {
                return (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
