import React from "react";
import { Container } from "react-bootstrap";
import { proverbs } from "../../helpers/mockProverbs";
import FlexTable from "../../components/FlexTable";

const title = [
  {
    title: "Proverb",
    fieldName: "proverb",
    className: "col-xs-2",
  },
  {
    title: "Translation",
    fieldName: "translation",
    className: "col-xs-2",
  },
  {
    title: "Explanation",
    fieldName: "explanation",
    className: "col-xs-3",
  },
];

const ProverbList = () => {
  return (
    <Container>
      <FlexTable
        data={proverbs}
        titleData={title}
        tableId={"proverb-list-flex-table"}      
      />
    </Container>
  );
};

export default ProverbList;
