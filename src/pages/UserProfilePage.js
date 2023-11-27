import React from "react";
import Footer from "../features/footer.js/Footer";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <>
      <Navbar>
        <h1 className="text-left text-lg text-bold my-3">My Profile</h1>
        <UserProfile />
      </Navbar>
      <Footer />
    </>
  );
};

export default UserProfilePage;
