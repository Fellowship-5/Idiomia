import React from "react";

const FlexTableHeader = ({ titleData }) => {
  return (
    <div className="flexTable-row flexTable-row--head">
      <div className="flexTable-row flexTable-row--head">
        {titleData.map((item, k) => (
          <div
            key={k}
            className={`flexTable-cell ${item.fieldName}-cell column-heading`}
          >
            {" "}
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlexTableHeader;
