import React from "react";
import Proverb from "./Proverb";

const UpdateProverb = ({ handleCloseModal }) => {
  return <Proverb actionType="Update" handleCloseModal={handleCloseModal} />;
};

export default UpdateProverb;
