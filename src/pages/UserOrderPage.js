import React from "react";
import Footer from "../features/footer.js/Footer";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

const UserOrderPage = () => {
  return (
    <>
      <Navbar>
        <h1 className="text-left text-lg text-bold my-3">My Orders</h1>
        <UserOrders />
      </Navbar>
      <Footer />
    </>
  );
};

export default UserOrderPage;
