import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import TypingTest from "./pages/TypingTest";
import Results from "./pages/Results";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/test" element={<TypingTest />} />
          <Route path="/results" element={<Results />} />
        </Routes>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;