import { Nunito } from "next/font/google"; // Correct import
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

// Instantiate the font loader
const nunitoFont = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Kids-Story",
  description: "AI-Kids-Story-Generator",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunitoFont.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
