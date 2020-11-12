import React from "react";
import Proverb from "./Proverb";

const AddProverb = ({ handleCloseModal, actionType }) => {
  return (
    <Proverb actionType={actionType} handleCloseModal={handleCloseModal} />
  );
};

export default AddProverb;
