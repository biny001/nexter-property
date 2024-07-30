import connectDB from "@/config/database";
import Property from "@/models/Property";

//GET /api/properties/search

export const GET = async (request) => {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");
    //match location pattern against db fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };
    // onlcy check for property if its not All

    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    console.log(properties);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("something went wrong", { status: 500 });
  }
};
