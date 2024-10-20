"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "#09090b",
              border: "1px solid #27272a",
              color: "#fff",
            },
          }}
          position="top-center"
          reverseOrder={false}
        />
        <ThemeProvider enableSystem>{children}</ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
