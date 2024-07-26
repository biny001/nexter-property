import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectDB();

    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const user = await User.findOne({ _id: userSession.userId });

    const property = await Property.find({ _id: { $in: user.bookmarks } });
    // console.log(property);

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { userId } = sessionUser;

    //Find user in database
    const user = await User.findOne({ _id: userId });

    //check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      //if already bookmarked,remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      //If not bookmarked,add it
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";

      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (err) {
    console.log(error);
  }
};
