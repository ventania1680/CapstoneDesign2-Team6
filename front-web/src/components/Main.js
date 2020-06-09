import React from "react";
import styled from "styled-components";
import oc from "open-color";
import Introduction from "./Introduction";
import "../styles/serviceEngine.scss";
import ServiceTTS from "./ServiceTTS";
import ServiceSTT from "./ServiceSTT";

const BackgroundColor = styled.div`
  background: ${oc.gray[1]};
`;

const Positioner = styled.div`
  margin: auto;
  width: 1100px;
  text-align: center;
  vertical-align: center;

  border: 2px solid ${oc.teal[2]};
  background: white;
`;

const ColorTealHr = styled.hr`
  border: none;
  border: 1px solid ${oc.teal[2]};
`;

const Main = () => {
  return (
    <BackgroundColor>
      <Positioner>
        <Introduction />
        <ServiceTTS />
        <ColorTealHr />
        <ServiceSTT />
      </Positioner>
    </BackgroundColor>
  );
};

export default Main;
