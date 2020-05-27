import React from "react";
import "../styles/serviceEngine.scss";

const ServiceTTS = () => {
  return (
    <div className="Service">
      <h1>당신의 글을 소리로 바꿔드려요</h1>
      <div className="ServiceBox">
        <div>text 파일올리기</div>
        <div>text 입력하기</div>
      </div>
      <button>변환하기</button>
      <div className="ServiceResult">변환</div>
    </div>
  );
};

export default ServiceTTS;
