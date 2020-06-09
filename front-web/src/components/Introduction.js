import React from "react";
import styled from "styled-components";
import oc from "open-color";
import mainBackground from "../img/mainBackground.jpg";
import "../styles/Circle.scss";
//import mainLogo from "../img/mainLogo.png";

const IntroComponent = styled.div`
  position: relative;
  display: block;
  text-align: center;
  height: 700px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  height: 700px;
  background: black;
`;

const BackgroundImg = styled.img.attrs({
  src: mainBackground,
})`
  width: 100%;
  height: 700px;
  opacity: 0.2;
`;

const LogoBox = styled.div`
  position: relative;
  text-align: center;
`;

const LogoText = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  color: ${oc.teal[0]};
  font-size: 80px;
  height: 700px;
  line-height: 700px;
  letter-spacing: 24px;
`;

const CircleContainter = () => {
  return (
    <>
      {[...Array(100)].map((x, i) => (
        <div class="circle-container">
          <div class="circle"></div>
        </div>
      ))}
    </>
  );
};

const Introduction = () => {
  return (
    <IntroComponent>
      <Background>
        <BackgroundImg />
        <CircleContainter />
      </Background>
      <LogoBox>
        <LogoText>ROZMOWA</LogoText>
      </LogoBox>
    </IntroComponent>
  );
};

export default Introduction;
