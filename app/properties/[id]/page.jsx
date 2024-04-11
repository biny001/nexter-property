"use client";
const PropertyPage = () => {
  return (
    <div>
      <button
        onClick={() => router.push("/?hello=world")}
        className=" bg-blue-500 px-6 py-4 rounded-lg text-white"
      >
        Go home
      </button>
    </div>
  );
};

export default PropertyPage;
