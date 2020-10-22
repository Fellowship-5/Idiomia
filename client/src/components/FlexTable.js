import React from "react";
import "./FlexTable.css";
import Icon from "./Icon";

const FlexTable = ({ titleData = [], data = [], iconClick, tableId }) => {
  return (
    <div
      id={tableId}
      className="flexTable flexTable--5cols flexTable--collapse"
    >
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
      {data.map((item, i) => (
        <React.Fragment key={"row" + i}>
          <div className="flexTable-row">
            {titleData.map((title, k) => {
              if (item[title.fieldName]) {
                return (
                  <div
                    className={`flexTable-cell ${title.fieldName}-cell`}
                    key={"column" + k}
                  >
                    <div className="flexTable-cell--heading">{title.title}</div>
                    <div
                      className={`flexTable-cell--content ${title.fieldName}-content`}
                    >
                      {item[title.fieldName]?.name || item[title.fieldName]}
                    </div>
                  </div>
                );
              }
              return (
                <div
                  className={`flexTable-cell ${title.fieldName}-cell`}
                  key={`icon${k + k}`}
                  name={item.id}
                >
                  <div className="flexTable-cell--heading">{title.title}</div>
                  <div
                    className={`flexTable-cell--content ${title.fieldName}-content`}
                  >
                    {title.icons?.map((icon, i) => (
                      <Icon
                        key={i}
                        name={item.id}
                        icon={"fa" + icon}
                        onClick={iconClick}
                        id={icon}
                        size={"1x"}
                        fixedWidth
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FlexTable;
