import React, { useCallback, useContext, useEffect, useState } from "react";
import { Table, Email } from "../components";

function App() {
  return (
    <body className="max-w-screen-md mx-auto">
      <Email />

      <Table />
    </body>
  );
}

export default App;
