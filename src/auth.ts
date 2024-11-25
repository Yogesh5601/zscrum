import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "./models";
import dbConnect from "./lib/dbconnect";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // The `signIn` callback is where you check and create a user
    async signIn({ user }) {
      try {
        await dbConnect();
        console.log(user, "user details");
        const existingUser = await User.findOne({ email: user.email });
        console.log(existingUser, "existing user");

        if (!existingUser) {
          // New user: Create a user record without additional properties
          const savedUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            isProfileComplete: false,
          });

          console.log(savedUser, "saved user");
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Sign-in error:", error);
        return false; // Deny sign-in
      }
    },

    // The `session` callback to modify the session object (no `isProfileComplete` anymore)
    async session({ session }) {
      // If you don't need `isProfileComplete`, just return the session without modifications
      return session;
    },

    // Optional: `jwt` callback (no `isProfileComplete` anymore)
    async jwt({ token }) {
      return token; // No need to add extra properties to the JWT token
    },
  },
});
