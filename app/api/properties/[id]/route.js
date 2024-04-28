import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET / api / properties /:id  ;

export const GET = async (request, { params }) => {
  const id = params.id;
  console.log(id);
  try {
    await connectDB();

    const property = await Property.findById(id);
    // console.log(property);
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error fetching property", { status: 500 });
  }
};

// delete /api/properties/:id
export const DELETE = async (request, { params }) => {
  const id = params.id;
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return new Response("user id is required ", { status: 401 });
  }
  const { userId } = sessionUser;
  try {
    await connectDB();

    const property = await Property.findById(id);
    // console.log(property);
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();
    return new Response("Property Deleted", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error fetching property", { status: 500 });
  }
};
