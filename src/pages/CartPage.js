import React from "react";
import Cart from "../features/cart/Cart";
import Footer from "../features/footer.js/Footer";
import Navbar from "../features/navbar/Navbar";

const CartPage = () => {
  return (
    <>
      <Navbar>
        <Cart />
      </Navbar>
      <Footer />
    </>
  );
};

export default CartPage;
