import React from "react";
import Proverb from "./Proverb";

const AddProverb = ({ handleCloseModal }) => {
  return <Proverb actionType="Add" handleCloseModal={handleCloseModal} />;
};

export default AddProverb;
