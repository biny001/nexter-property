import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET / api / properties /:id  ;

export const GET = async (request, { params }) => {
  const id = params.id;
  console.log(id);
  try {
    await connectDB();

    const property = await Property.findById(id);
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error fetching property", { status: 500 });
  }
};
