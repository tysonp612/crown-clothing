import React from "react";
import { HomePageContainer } from "./homepage.styles.jsx";
import Directory from "./../../components/directory-item/directory.component";
const HomePage = () => {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};

export default HomePage;
