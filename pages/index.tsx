import React, { useCallback, useContext, useEffect, useState } from "react";
import { Table, Email, Footer } from "../components";

function App() {
  return (
    <body className="max-w-screen-md mx-auto">
      <Email />
      <Table />
      <Footer />
    </body>
  );
}

export default App;
