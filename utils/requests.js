const apiDomain = process.env.NEXT_PUBLIC_API_URL || null;

//fetch all properties
async function fetchProperties() {
  try {
    // hanlde the case where the domian is not availbale yet

    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Error while getting data");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

//fetch propertie by id

async function fetchPropertyById(id) {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Error while getting data");
    }
    return res.json();
  } catch (err) {
    console.log("error fetching property by id");
    return null;
  }
}

export { fetchProperties, fetchPropertyById };
