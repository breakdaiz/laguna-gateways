"use client";
import { usePathname } from "next/navigation";
import React from "react";
import PrivateLayoutProvider from "./private-layout";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  if (pathName.startsWith("/admin") || pathName.startsWith("/user")) {
    return <PrivateLayoutProvider>{children}</PrivateLayoutProvider>;
  }
  return children;
}

export default LayoutProvider;
