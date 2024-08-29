import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/login";
import Sidebar from "./components/bars/SideBar";
import SmallSidebar from "./components/bars/SmallSidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import User from "./pages/users/user";
import Supplier from "./pages/Suppliers/supplier";
import Store from "./pages/Hotel/Hotel";
import Booking from "./pages/Hotel/booking";
import Bookings from "./pages/Booking/booking";
import Settings from "./pages/Settings/Settings";
import HotelDetails from "./pages/Hotel/BookBed";
import Ledger from "./pages/Ledger/Ledger";
import HotelVoucher from "./pages/HotelVoucher/HotelVoucher";
import HotelInvoice from "./pages/HotelInvoice/HotelVoucher";
import PaymentVoucher from "./pages/PaymentVoucher/PaymentVoucher";
import LedgerReport from "./pages/LedgerReports/LedgerReport";
import CustomerReports from "./pages/CustomerTrackReports/Report";
import ArrivalDepReport from "./pages/Arr_Dep_Reports/ReportFormat";
import Bank from "./pages/Bank/Bank";
import RoomLedgerReport from "./pages/RoomLedgerReport/RoomLedgerReport";
import WastageReport from "./pages/WastageCollectionReport/WastageCollectionReport";
import InventoryReport from "./pages/InventoryReport/InventoryReport";
import HotelInsightReport from "./pages/HotelsInsightReport/HotelInsightReport";

export const AuthContext = React.createContext();

const App = () => {
  const [hideSidebar, setHideSidebar] = useState(false);
  const [changeUser, setChangeUser] = useState(false);
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")));

  useEffect(() => {
    const storedLogin = JSON.parse(localStorage.getItem("login"));
    setLogin(storedLogin);
  }, []);

  const value = {
    hideSidebar,
    setHideSidebar,
    changeUser,
    setChangeUser,
    login,
    setLogin,
  };

  const AdminLayout = () => {
    // console.log("login value", login);
    return (
      <div className="w-screen min-h-screen bg-black">
        <div className="hidden md:block" style={{ overflowX: "hidden" }}>
          {login && (
            <div className="h-full grid grid-cols">
              <div className="flex-grow">
                <Sidebar />
              </div>
              <div className="bg-black h-full ml-60 flex-grow">
                <Outlet />
              </div>
            </div>
          )}
        </div>
        <div className="block md:hidden">
          {login && (
            <div className="h-screen grid grid-cols w-full">
              {hideSidebar ? (
                <div className="flex bg-black h-full">
                  <Outlet />
                </div>
              ) : (
                <div>
                  <SmallSidebar />
                  <div className="bg-black h-full ml-20 flex-grow">
                    <Outlet />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const LoginLayout = () => {
    return (
      <div className="bg-black" style={{ height: "100vh", width: "100vw" }}>
        <Outlet />
      </div>
    );
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<LoginLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<User />} />
            <Route path="suppliers" element={<Supplier />} />
            <Route path="hotel" element={<Store />} />
            <Route path="hotel/:id" element={<HotelDetails />} />
            <Route path="booking" element={<Booking />} />
            <Route path="Allbookings" element={<Bookings />} />
            <Route path="settings" element={<Settings />} />
            <Route path="ledger" element={<Ledger />} />
            <Route path="room-ledger/:id" element={<RoomLedgerReport />} />
            <Route path="hotel-voucher/:id" element={<HotelVoucher />} />
            <Route path="hotel-invoice/:id" element={<HotelInvoice />} />
            <Route path="payment-voucher" element={<PaymentVoucher />} />
            <Route path="ledger-report" element={<LedgerReport />} />
            <Route path="customer-reports" element={<CustomerReports />} />
            <Route path="wastage-collection-report" element={<WastageReport/>} />
            <Route path="report" element={<ArrivalDepReport />} />
            <Route path="bank" element={<Bank />} />
            <Route path="pending-booking-report" element={<InventoryReport/>}/>
            <Route path="hotel-insight" element={<HotelInsightReport/>}/>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
