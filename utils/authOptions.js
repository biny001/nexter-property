import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

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
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //invoked on successfu signin
    async signIn({ profile }) {
      //1.connect to database
      //2.check if user exists
      //3.if not create a new user
      //4.return true to allow signin
    },
    //modifies the seession object
    async session({ session }) {
      //1.get user from database
      //2.Assign the user id to the session
      //3.return session
    },
  },
};
