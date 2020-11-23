import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import { isArabic, validateForm } from "./../../helpers/functions";
import { PROVERB_INITIAL_DATA } from "./../../helpers/formData";
import { useProverb, useAuth } from "./../../redux/hooks";

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

  const { proverb, translation, explanation, errors } = formData;

  useEffect(() => {
    if (!("errors" in proverbObj)) {
      proverbObj.errors = {
        proverb: "",
        translation: "",
        explanation: "",
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proverbObj]);

  useEffect(
    function shouldButtonBeDisabled() {
      const isFilled = [proverb, translation, explanation].every((data) =>
        Boolean(data)
      );
      isFilled ? setDisabled(false) : setDisabled(true);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [formData]
  );

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
      case "proverb":
        const result = isArabic(value);
        errors.proverb =
          value.length < 1 || !result
            ? "Proverb input should be in Arabic"
            : "";
        break;
      case "translation":
        errors.translation =
          value.length < 1 ? "Translation cannot be empty!" : "";
        break;
      case "explanation":
        errors.explanation =
          value.length < 10
            ? "Explanation must be at least 10 characters!"
            : "";
        break;
      default:
        break;
    }
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const proverbAddAction = isAuthenticated ? addUserProverb : addProverb;
    if (validateForm(errors)) {
      Object.values(errors).forEach(
        (error) =>
          error &&
          toast(error, {
            className: "toast-auth-error",
            position: "top-left",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
      );
      return;
    }
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
