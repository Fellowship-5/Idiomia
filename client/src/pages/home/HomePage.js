import React from "react";
import ProverbList from "./../proverb/ProverbList";

import Section from "./../../components/Section";
import Breadcrumb from './../../components/Breadcrumb'

const HomePage = () => {
  return (
    <div>
   <Section
        id="page-title"
        title="PROVERBS"
        containerClass="d-flex justify-content-between mx-5 align-items-center"
      >
        <Breadcrumb  />
      </Section>
      <ProverbList />
    </div>
  );
};

export default HomePage;
