import React from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import UserProfile from "./section-components/user-profile";
import Subscribe from "./section-components/subscribe";
import Footer from "./global-components/footer";

const UserProfilePage = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url("https://delhibycycle.s3.ap-south-1.amazonaws.com/delhi-agra-cycle-tour-header-landing-page-delhi-by-cycle.jpg")`,
        }}
      >
        <Navbar />
        <PageHeader headertitle="User Profile" />
      </div>
      <UserProfile />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default UserProfilePage;
