import React, { useState } from "react";
import ProverbList from "./../proverb/ProverbList";
import AddProverb from "./../proverb/AddProverb";
import Section from "./../../components/Section";
import Breadcrumb from "./../../components/Breadcrumb";
import Modal from "./../../components/Modal";
import Button from "./../../components/Button";

import './HomePage.css'

const HomePage = () => {
  //Modal States
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    id: "",
  });

  //Modal Handlers

  const handleShow = (type) => async (e) => {
    e.preventDefault();
    if (type === "add") {
      setModal({
        isOpen: true,
        type: "Add",
      });
    }
  };
  return (
    <div>
      <Modal
        isOpen={modal.isOpen}
        modalClose={() => setModal({ isOpen: false })}
        centered={true}
        dialogClassName='add-proverb-modal'
      >
        {modal.type === "Add" && (
          <AddProverb actionType="Add" setModal={setModal} />
        )}
      </Modal>
   
      <Section
        id="page-title"
        title="PROVERBS"
        containerClass="d-flex justify-content-between mx-5 align-items-center"
      >
        <Breadcrumb />
      </Section>
      <Button
        variant="info"
        text="Add Proverb"
        onClick={handleShow("add")}
        color="white"
        type="submit"
        className="button-custom float-right m-5"
        id="homepage-add-proverb-button"
      />
      <ProverbList />
    </div>
  );
};

export default HomePage;
