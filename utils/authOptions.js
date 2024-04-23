import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDB from "@/config/database";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
  ],
  callbacks: {
    //invoked on successfu signin
    async signIn({ profile }) {
      //1.connect to database
      await connectDB();

      //2.check if user exists
      const userExists = await User.findOne({ email: profile.email });
      //3.if not create a new user
      if (!userExists) {
        //Truncate username if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //4.return true to allow signin
      return true;
    },
    //modifies the seession object
    async session({ session }) {
      //1.get user from database

      const user = await User.findOne({ email: session.user.email });
      //2.Assign the user id to the session
      session.user.id = user._id.toString();

      //3.return session
      return session;
    },
  },
};
