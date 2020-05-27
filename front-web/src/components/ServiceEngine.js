import React from "react";
import "../styles/serviceEngine.scss";
import ServiceTTS from "./ServiceTTS";
import ServiceSTT from "./ServiceSTT";

const ServiceEngine = () => {
  return (
    <>
      <ServiceTTS />
      <ServiceSTT />
    </>
  );
};

export default ServiceEngine;
