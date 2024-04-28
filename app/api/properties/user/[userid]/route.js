import connectDB from "@/config/database";
import Property from "@/models/Property";

//GET /api/properties/user/:userid
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const { userid } = params;
    if (!userid) {
      return new Response("user Id is required", { status: 400 });
    }
    const properties = await Property.find({ owner: userid });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
