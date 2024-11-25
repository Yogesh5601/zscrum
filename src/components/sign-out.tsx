import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      onClick={
        () => signOut({ callbackUrl: "/" }) // Redirect to login page after signing out
      }
     className="cursor-pointer flex w-full"
    >
      Sign Out
    </button>
  );
}
