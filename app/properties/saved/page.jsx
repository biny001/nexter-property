"use client";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import React from "react";
import { useState, useEffect } from "react";

const SavedProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");
        const data = await res.json();

        console.log(data);
        setProperties(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="container-xl lg:container m-auto px-4  py-6">
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedProperty;
