import React from "react";
import { Tabs as TabsBootstrap, Tab } from "react-bootstrap";
import "./Tabs.css";

const Tabs = ({ activeTab, setActiveTab, contents }) => {
  return (
    <TabsBootstrap
      id="nav-tab-link"
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k)}
      className="custom-nav-tabs"
    >
      {contents.map((content, i) => (
        <Tab key={"tabs " + i} eventKey={content.tab} title={content.title}>
          {content.component}
        </Tab>
      ))}
    </TabsBootstrap>
  );
};

export default Tabs;
