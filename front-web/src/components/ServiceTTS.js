import React from "react";
import styled from "styled-components";
import oc from "open-color";
import "../styles/Button.scss";

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
  justify-content: center;
  border-radius: 0.5rem;
  margin: auto;
  margin-top: 10px;
  width: 500px;
  height: 200px;
  background-color: ${oc.gray[1]};
`;

const ComponentName = styled.div`
  display: inline-block;
  justify-content: center;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  width: 100%;
  background-color: ${oc.indigo[3]};
  color: white;
`;

const BlankDiv = styled.div`
  height: 50px;
`;

const Service = ({ name }) => {
  return (
    <>
      <BlankDiv />
      <Component>
        <TextH1>당신의 글을 소리로 바꿔드려요</TextH1>
        <BlankDiv />
        <ComponentBlock>
          <ComponentBox>
            <ComponentName>New {name} File</ComponentName>
            <form
              method="post"
              encType="multipart/form-data"
              className="StyledForm"
            >
              <input type="file" name="upload" className="StyledInput" />
              <BlankDiv />
            </form>
          </ComponentBox>
        </ComponentBlock>
        <BlankDiv />
        <input
          type="submit"
          name="submit"
          value="변환하기"
          className="StyledButton"
        />
      </Component>
      <BlankDiv />
    </>
  );
};

const ServiceTTS = () => {
  return <Service name="Text" />;
};

export default ServiceTTS;

// const ServiceTTS = () => {
//   return (x
//     <div className="Service">
//       <h1>당신의 글을 소리로 바꿔드려요</h1>
//       <div className="ServiceBox">
//         <div className="ServiceBox-select">
//           <div>New Text File</div>
//         </div>
//         <div className="ServiceBox-select">
//           <div>New Text Input</div>
//         </div>
//       </div>
//       <Button>변환하기</Button>
//       <div className="ServiceResult">
//         <div>Result</div>
//       </div>
//     </div>
//   );
// };
