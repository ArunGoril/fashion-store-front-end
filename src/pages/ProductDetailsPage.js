import React from "react";
import Footer from "../features/footer.js/Footer";
import Navbar from "../features/navbar/Navbar";
import ProductDetails from "../features/product/components/ProductDetails";

const ProductDetailsPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetails />
      </Navbar>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
