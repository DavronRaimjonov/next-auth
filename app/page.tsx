import Login from "@/components/login";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  return <Login />;
}
