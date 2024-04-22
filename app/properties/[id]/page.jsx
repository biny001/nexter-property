"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchPropertyById } from "@/utils/requests.js";
import PropertyHeader from "@/components/PropertyHeader";

const PropertyPage = async () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const propertyData = await fetchPropertyById(id);
        setProperty(propertyData);
      } catch (err) {
        console.log("error fetching property by id");
        return null;
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className=" text-center   text-2xl font-bold ">Property not found</h1>
    );
  }

  return (
    <>
      {!loading && property && (
        <>
          <PropertyHeader image={property?.images[0]} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
