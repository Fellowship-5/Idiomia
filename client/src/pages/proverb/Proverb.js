import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import { isArabic } from "./../../helpers/functions";
import { PROVERB_INITIAL_DATA } from "./../../helpers/formData";
import { useProverb, useAuth, usePagination } from "./../../redux/hooks";

import "./Proverb.css";

const Proverb = ({ actionType, handleCloseModal }) => {
  const { isAuthenticated } = useAuth();
  const {
    addProverb,
    addUserProverb,
    updateProverb,
    proverb: proverbObj,
    loading,
    updateUserProverb,
  } = useProverb();

  const isNewProverb = !loading && actionType === "Add";
  const proverbFormValues = isNewProverb ? PROVERB_INITIAL_DATA : proverbObj;

  const [formData, setFormData] = useState(proverbFormValues);
  const [disabled, setDisabled] = useState(true);

  const { proverb, translation, explanation } = formData;

  useEffect(() => {
    const isFilled = [proverb, translation, explanation].every((data) =>
      Boolean(data)
    );
    const result = isArabic(proverb);
    const shouldBeDisabled = !isFilled || !result;
    setDisabled(shouldBeDisabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const proverbAddAction = isAuthenticated ? addUserProverb : addProverb;

    if (actionType === "Add") {
      await proverbAddAction(formData);
      handleCloseModal();
      return;
    }
    if (actionType === "Update") {
      await updateProverb(formData, proverbObj._id);
      handleCloseModal();
      return;
    }
    if (actionType === "AdminUpdate") {
      await updateUserProverb(formData, proverbObj._id);
      handleCloseModal();
      return;
    }
  };

  return (
    <Form>
      <Input
        label="Proverb"
        id="proverb-proverb"
        type="text"
        value={proverb}
        name="proverb"
        onChange={handleInputChange}
        placeholder="أضف مثلًا أو تعبيرًا باللغة العربية"
        autoComplete="off"
        labelClassName="input-form-label my-3"
        className="rounded"
        readOnly={actionType === "Update"}
      />
      <Input
        label="Translation"
        id="proverb-translation"
        type="text"
        value={translation}
        name="translation"
        onChange={handleInputChange}
        placeholder="English translation"
        autoComplete="off"
        labelClassName="input-form-label my-3"
        className="rounded"
      />

      <Input
        label="Explanation"
        id="proverb-explanation"
        type="text"
        value={explanation}
        name="explanation"
        onChange={handleInputChange}
        placeholder="English explanation"
        autoComplete="off"
        labelClassName="input-form-label my-3"
        className="rounded"
        as="textarea"
      />

      <Button
        variant="info"
        text={actionType}
        onClick={onSubmit}
        color="white"
        type="submit"
        className="button-custom float-right"
        id="add-proverb-button"
        disabled={disabled}
      />
    </Form>
  );
};

export default Proverb;
