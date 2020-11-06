import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import FlexTable from "../../components/FlexTable";
import { useProverb } from "./../../redux/hooks";
import { homepageTableTitle } from "./../../helpers/flexTableData";

const ProverbList = () => {
  const { proverbs, getProverbs } = useProverb();
  // Fetch All Proverbs
  useEffect(
    function fetchAllProverbs() {
      getProverbs();
    },
    [getProverbs]
  );

  return (
    <Container>
      <FlexTable
        data={proverbs}
        titleData={homepageTableTitle}
        tableId={"proverb-list-flex-table"}
        tableType="homepage-flexTable"
      />
    </Container>
  );
};

export default ProverbList;
