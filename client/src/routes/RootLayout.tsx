import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";

const RootLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <AppHeader />
        <main className="h-full flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
