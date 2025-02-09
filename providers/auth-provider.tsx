"use client";

import { SessionProvider } from "next-auth/react";

const NextAuhtProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuhtProvider;
