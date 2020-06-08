import React from "react";
import "../styles/serviceEngine.scss";
import Button from "./common/Button";

const ServiceTTS = () => {
  return (
    <div className="Service">
      <h1>당신의 글을 소리로 바꿔드려요</h1>
      <div className="ServiceBox">
        <div className="ServiceBox-select">
          <span>새로운 텍스트파일 올리기</span>
        </div>
        <div className="ServiceBox-select">
          <span>새로운 텍스트 입력하기</span>
        </div>
      </div>
      <Button>변환하기</Button>
      <div className="ServiceResult">변환</div>
    </div>
  );
};

export default ServiceTTS;
