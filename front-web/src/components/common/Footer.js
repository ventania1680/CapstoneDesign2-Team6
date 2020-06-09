import React from "react";
import styled from "styled-components";
import oc from "open-color";

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
  height: 3px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;

// 검은 배경
const BlackBackground = styled.div`
  background: ${oc.gray[9]};
  width: 100%;
`;

const FooterContent = styled.div`
  font-size: 1.1rem;
  letter-spacing: 1.5px;
  color: ${oc.teal[1]};
  height: 55px;
  line-height: 55px;

  text-align: right;
  align-items: center;

  padding-right: 1rem;
  padding-left: 1rem;
`;

const Footer = () => {
  return (
    <BlackBackground>
      <GradientBorder />
      <FooterContent>KNU Capstone Design 2. Team 6</FooterContent>
    </BlackBackground>
  );
};

export default Footer;
