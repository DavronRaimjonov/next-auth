"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {session ? (
        <>
          <p className="text-xl">Salom, {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Chiqish
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => signIn("google")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Google bilan kirish
          </button>
          <button
            onClick={() => signIn("github")}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            GitHub bilan kirish
          </button>
        </>
      )}
    </div>
  );
}
``;
