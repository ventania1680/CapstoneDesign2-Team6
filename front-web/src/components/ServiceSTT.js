import React from "react";
import "../styles/serviceEngine.scss";
import Button from "./common/Button";

const ServiceSTT = () => {
  return (
    <div className="Service">
      <h1>당신의 소리를 글로 바꿔드려요</h1>
      <div className="ServiceBox">
        <div className="ServiceBox-select">
          <span>새로운 음성파일 올리기</span>
        </div>
        <div className="ServiceBox-select">
          <span>새로운 음성 녹음하기</span>
        </div>
      </div>
      <Button>변환하기</Button>
      <div>변환값</div>
    </div>
  );
};

export default ServiceSTT;
