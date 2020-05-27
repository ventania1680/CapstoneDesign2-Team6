import React from "react";
import "../styles/introduction.scss";
import mainBackground from "../img/mainBackground.jpg";
//import mainLogo from "../img/mainLogo.png";

const Introduction = () => {
  return (
    <div className="Intro">
      <div className="Background">
        <img
          src={mainBackground}
          alt="mainBackground"
          width="100%"
          height="600px"
        />
      </div>
      <div className="Logo">
        <div className="Name">ROZMOWA</div>
      </div>
      <div height="600px"></div>
    </div>
  );
};

export default Introduction;
