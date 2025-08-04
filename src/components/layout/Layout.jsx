import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="px-4 py-6">
      <Outlet />
    </main>
  );
};

export default Layout;
