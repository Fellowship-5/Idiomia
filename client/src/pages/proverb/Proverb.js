import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import { isArabic } from "./../../helpers/functions";
import { PROVERB_INITIAL_DATA } from "./../../helpers/formData";
import { useProverb } from "./../../redux/hooks";

import "./Proverb.css";

const Proverb = ({ actionType, handleCloseModal }) => {
  const { addProverb } = useProverb();

  const [formData, setFormData] = useState(PROVERB_INITIAL_DATA);
  const [disabled, setDisabled] = useState(true);

  const { proverb, translation, explanation } = formData;

  useEffect(() => {
    const isFilled = [proverb, translation, explanation].every((data) =>
      Boolean(data)
    );
    const result = isArabic(proverb);
    const shouldBeDisabled = !isFilled || !result;
    setDisabled(shouldBeDisabled);
  }, [formData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    actionType === "Add" && addProverb(formData);
    handleCloseModal();
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
        text="Add"
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
