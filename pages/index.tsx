import React, { useCallback, useContext, useEffect, useState } from "react";
import { Table, Email, Footer } from "../components";
import Image from "next/image";

function App() {
  return (
    <body className="max-w-screen-md mx-auto">
      <div className="p-4 pb-0 md:p-0 md:pt-6">
        <a href="https://www.steakwallet.fi">
          <Image src={`/images/steakwallet-logo.svg`} width={170} height={28} />
        </a>
      </div>
      <Email />
      <Table />
      <Footer />
    </body>
  );
}

export default App;
