"use client";
import React from "react";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { getAddress } from "../utils/helper";
import Spinner from "./Spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";

import { setDefaults, fromAddress } from "react-geocode";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
    width: "100%",
    height: "500px",
  });
  const [geocodeError, setGeocodeError] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log("FIRESTONE PARK, CA 90001,USA");

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await getAddress(
          `${property.location.street}, ${property.location.city}, ${property.location.state} ${property.location.zipcode}`
        );

        //   `${property.location.street}, ${property.location.city}, ${property.location.state} ${property.location.zipcode}`

        if (res.results.length === 0) {
          //no results
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        console.log(lat, lng);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError) {
    return <div className="text-xl"> No location data found</div>;
  }

  return (
    !loading && (
      <Map
        mapLib={import("mapbox-gl")}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: "100%", height: "500px" }}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
      >
        <Marker
          longitude={lng}
          latitude={lat}
          anchor="bottom"
        >
          <Image
            src={pin}
            alt="location"
            width={40}
            height={40}
          />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
