import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Section from "../../components/Section";
import Breadcrumb from "../../components/Breadcrumb";
import "./About.css";
export default function About(props) {
  const { t } = useTranslation("about");
  return (
    <div>
      <Section id="about-section" title={t("ABOUT IDIOMIA")}>
        <Breadcrumb activePage="About" />
      </Section>
      <Container className="about-section">
        <h3>{t("What is Idiomia?")}</h3>
        <p>{t("What")}</p>
        <h3>{t("Why Idiomia?")}</h3>
        <p> 
          {t("Why")}
        <ul>   
          <li>{t("first reason")}</li>
          <li>{t("second reason")}</li>
          <li>{t("third reason")}</li>
        </ul>
        </p>
        <h3>{t("How?")}</h3>
        <p>{t("How")}</p>
      </Container>
    </div>
  );
}
