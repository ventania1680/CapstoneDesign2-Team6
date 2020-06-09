import React from "react";
import styled from "styled-components";
import Button from "./Button";
import oc from "open-color";

const Component = styled.div`
  display: block;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
`;

const TextH1 = styled.h1`
  font-size: 40px;
  letter-spacing: 10px;
`;

const ComponentBlock = styled.div`
  display: block;
  border-radius: 0.5rem;
`;

const ComponentBox = styled.div`
  font-size: 18px;
  border-radius: 0.5rem;
  display: inline-block;
  margin: 10px 10px;
  background-color: ${oc.gray[1]};
  width: 240px;
  height: 200px;

  :hover {
    width: 60%;
    background-color: ${oc.gray[0]};
  }
`;

const ComponentName = styled.div`
  display: inline-block;
  justify-content: center;
  height: 40px;
  line-height: 40px;
  width: 100%;
  background-color: ${oc.cyan[3]};
  color: white;
`;

const ResultBox = styled.div`
  justify-content: center;
  border-radius: 0.5rem;
  margin: auto;
  margin-top: 10px;
  width: 500px;
  height: 200px;
  background-color: ${oc.gray[1]};
`;

const ResultName = styled.div`
  display: inline-block;
  justify-content: center;
  width: 100%;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  background-color: ${oc.cyan[3]};
  color: white;
`;

const Service = ({ name }) => {
  return (
    <Component>
      <TextH1>당신의 소리를 글로 바꿔드려요</TextH1>
      <ComponentBlock>
        <ComponentBox>
          <ComponentName>New {name} File</ComponentName>
        </ComponentBox>
        <ComponentBox>
          <ComponentName>New {name} Input</ComponentName>
        </ComponentBox>
      </ComponentBlock>
      <Button> 변환하기 </Button>
      <ResultBox>
        <ResultName>Result</ResultName>
      </ResultBox>
    </Component>
  );
};

export default Service;
