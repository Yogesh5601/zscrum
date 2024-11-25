// api/auth/[...nextauth]/route.ts
export { GET, POST } from "../../../../auth";

// import dbConnect from "@/lib/dbconnect";
// import { User } from "@/models";
// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//   ],
//   callbacks: {
//     // The `signIn` callback is where you check and create a user
//     async signIn({ user }) {
//       try {
//         await dbConnect();
//         console.log(user, "user details");
//         const existingUser = await User.findOne({ email: user.email });
//         console.log(existingUser, "existing user");

//         if (!existingUser) {
//           // New user: Create a user record without additional properties
//           const savedUser = await User.create({
//             name: user.name,
//             email: user.email,
//             image: user.image,
//           });

//           console.log(savedUser, "saved user");
//         }

//         return true; // Allow sign-in
//       } catch (error) {
//         console.error("Sign-in error:", error);
//         return false; // Deny sign-in
//       }
//     },

//     // The `session` callback to modify the session object (no `isProfileComplete` anymore)
//     async session({ session }) {
//       // If you don't need `isProfileComplete`, just return the session without modifications
//       return session;
//     },

//     // Optional: `jwt` callback (no `isProfileComplete` anymore)
//     async jwt({ token }) {
//       return token; // No need to add extra properties to the JWT token
//     },
//   },
// };

// // Use the handlers for NextAuth
// const handlers = NextAuth(authOptions);
// export { handlers as GET, handlers as POST };

// import dbConnect from "@/lib/dbconnect";
// import { User } from "@/models";
// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//   ],
//   callbacks: {
//     // The `signIn` callback is where you check and create a user
//     async signIn({ user }) {
//       try {
//         await dbConnect();
//         console.log(user, 'user details')
//         const existingUser = await User.findOne({ email: user.email });
//         console.log(existingUser, "existing user");
//         if (!existingUser) {
//           // New user: Create a user record with `isProfileComplete` as `false`
//           const savedUser = await User.create({
//             name: user.name,
//             email: user.email,
//             image: user.image,
//             isProfileComplete: false,
//           });

//           console.log(savedUser,"saved user")

//           // Set a timer to delete the user after 7 days if the profile is incomplete
//           // setTimeout(async () => {
//           //   const userToCheck = await User.findOne({ email: savedUser.email });
//           //   if (userToCheck && !userToCheck.isProfileComplete) {
//           //     await User.deleteOne({ email: savedUser.email });
//           //     console.log(
//           //       `Incomplete profile user ${savedUser.email} removed.`
//           //     );
//           //   }
//           // },5000); // 7 days
//         }

//         return true; // Allow sign-in
//       } catch (error) {
//         console.error("Sign-in error:", error);
//         return false; // Deny sign-in
//       }
//     },

//     // The `session` callback is where you modify the session object
//     async session({ session, user }) {
//       // `user` is typically available from the JWT token
//       // Ensure that `user.isProfileComplete` exists, if not default to false
//       session.user.isProfileComplete = user?.isProfileComplete || false;
//       return session;
//     },

//     // Optional: `jwt` callback to include `isProfileComplete` in the JWT token
//     async jwt({ token, user }) {
//       if (user) {
//         token.isProfileComplete = user.isProfileComplete || false;
//       }
//       return token;
//     },
//   },
// };

// const handlers = NextAuth(authOptions);
// export { handlers as GET, handlers as POST };
