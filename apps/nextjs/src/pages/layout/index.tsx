import React, { ReactNode } from "react";
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex-col justify-center">
      <Head>
        <title>Palinka AI Teacher Assistant</title>
        <meta name="description" content="palinka landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-6xl flex-col">
        <Navbar />
        <div className="mt-20">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
