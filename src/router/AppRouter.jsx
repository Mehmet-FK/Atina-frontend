import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AtinaUsers from "../pages/AtinaUsers";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="atina" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route path="users" element={<AtinaUsers />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
