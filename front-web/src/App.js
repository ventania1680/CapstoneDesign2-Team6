import React from "react";
import Introduction from "./components/Introduction";
import ServiceEngine from "./components/ServiceEngine";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <Introduction />
      <ServiceEngine />
      <Footer />
    </div>
  );
};

export default App;
