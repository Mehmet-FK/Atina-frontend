import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AtinaItems from "../pages/AtinaItems";

import AtinaUsers from "../pages/AtinaUsers";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import MobileBookings from "../pages/MobileBookings";
import NfcTags from "../pages/NfcTags";
import Settings from "../pages/Settings";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="atina" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<MobileBookings />} />
            <Route path="users" element={<AtinaUsers />} />
            <Route path="nfc" element={<NfcTags />} />
            <Route path="settings" element={<Settings />} />
            <Route path="items" element={<AtinaItems />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
