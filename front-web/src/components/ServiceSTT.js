import React from "react";
import "../styles/serviceEngine.scss";

const ServiceSTT = () => {
  return (
    <div className="Service">
      <h1>당신의 소리를 글로 바꿔드려요</h1>
      <div className="ServiceBox">
        <div>음성파일 파일올리기</div>
        <div>음성파일 녹음하기</div>
      </div>
      <button>변환하기</button>
      <div>변환값</div>
    </div>
  );
};

export default ServiceSTT;
