import React from "react";
import { Container } from "react-bootstrap";

import Section from "../../components/Section";
import Breadcrumb from "../../components/Breadcrumb";
import "./About.css";
export default function About(props) {
  return (
    <div>
      <Section id="about-section" title="ABOUT IDIOMIA">
        <Breadcrumb activePage="About" />
      </Section>
      <Container className="about-section">
        <p>
          Thanks to the advancement in technology, our world has become more of
          a small village. This great achivement has some downsides to it.{" "}
          <br /><br />
          One of them is that many of the proverbs and idioms of smaller, less
          dominating and less documented languages, accents, and dialects are
          lost. Losing them means that we are losing part of the human
          consciousness or a way of how the world was perceived .<br />
        </p>
        <p>
          <strong>Idiomia</strong> is trying to use technology to keep our world
          colorful and save part of humanity's heritage in one place and then
          making it available to the world.
          <br />
        </p>
        <p>
          We are starting with the Arabic language since it is one of the oldest
          languages in the world. And since the dialects and accents we have
          nowadays are mostly undocumented{" "}
          <strong>
            Idiomia is a project to collect them from the Arabic native speakers.
          </strong>
        </p>
      </Container>
    </div>
  );
}
