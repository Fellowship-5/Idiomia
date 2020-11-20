import React from "react";
import Proverb from "./Proverb";

const UpdateProverb = ({ handleCloseModal, actionType }) => {
  return (
    <Proverb actionType={actionType} handleCloseModal={handleCloseModal} />
  );
};

export default UpdateProverb;
