import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import dotenv from "dotenv";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Index from "./components/Index";
import Offers from "./components/Offers";
import MyAccount from "./components/MyAccount";
import List from "./components/List";
import NotFound from "./components/NotFound";
import Thanks from "./components/Thanks";
import Extra from "./components/Extra";
import Login from "./components/Login";
import Register from "./components/Register";
import TrackOrder from "./components/TrackOrder";
import Invoice from "./components/Invoice";
import Checkout from "./components/Checkout";
import Detail from "./components/Detail";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-select2-wrapper/css/select2.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";

dotenv.config();
function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/auth" && location.pathname !== "/register" ? (
        <Header />
      ) : (
        ""
      )}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/listing" element={<List />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/extra" element={<Extra />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listing/:vId/detail" element={<Detail />} />
        <Route element={<NotFound />} />
        /** Auth */
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
      {location.pathname !== "/auth" && location.pathname !== "/register" ? (
        <Footer />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
