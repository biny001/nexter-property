import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
import { redirect } from "next/dist/server/api-utils";

// GET / api / properties;
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({}).sort({ updatedAt: -1 });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 500 });
  }
};
// POST /api/properties
export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("user id is required", { status: 401 });
    }

    const { userId } = sessionUser;
    const formData = await request.formData();

    //Access all values from amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((images) => images.name !== "");

    //Create propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      descripition: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    //UPload images to cloudinary
    const imageUploadPromises = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      //make request to upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertypuls",
        }
      );
      imageUploadPromises.push(result.secure_url);

      //wait for allimages to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      //Add uploaded images to the propertyData object
      // console.log(uploadedImages);
      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);

    const savedProperty = await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${savedProperty._id}  `
    );
    // return new Response(JSON.stringify(propertyData, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "failed" }, { status: 500 }));
  }
};
