import React from "react";

// components

import FooterSmall from "components/Footers/FooterSmall.js";

export default function Auth({ children }) {
  return (
    <>
      <main>
        <section className="relative w-full h-full pt-12 sm:py-20 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-black bg-no-repeat bg-full"></div>
          <div
            className="bg-login absolute top-0 w-full h-full bg-black bg-no-repeat bg-full opacity-10"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
