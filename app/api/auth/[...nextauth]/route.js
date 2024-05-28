import ConnectDb from "@/models/db";
import { User } from "@/models/user.model";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from 'uuid'; // Use uuid to generate unique usernames if needed

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github" || account?.provider === "google") {
        await ConnectDb();

        try {
          const user = await User.findOne({ email: profile?.email });

          if (user) {
            console.log(`User with email "${profile.email}" already exists. Logging in...`);
            return true;
          } else {
            let username = profile?.login || profile?.name;

            // Generate a unique username if null or undefined
            if (!username) {
              username = `user_${uuidv4()}`;
              console.log(`Generated unique username: ${username}`);
            }

            // Check if the username already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
              console.log(`Username "${username}" already exists. Generating a new one.`);
              username = `user_${uuidv4()}`;
            }

            // Create user if it doesn't exist
            const newUser = new User({
              username,
              fullName: profile?.name,
              email: profile?.email,
              photo: profile?.image,
            });

            await newUser.save();
            console.log(`New user created: ${newUser.username}`);
            return true;
          }
        } catch (error) {
          if (error.code === 11000) {
            console.error("Duplicate key error:", error);
            return false;
          } else {
            console.error("Error during sign-in process:", error);
            return false;
          }
        }
      }
      return false;
    },
  },
});

export { handler as GET, handler as POST };
