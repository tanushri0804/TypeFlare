import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #0f0f0f;
  color: rgba(255, 255, 255, 0.15);
  padding: 1.2rem;
  text-align: center;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterText>made with 💜 by tanu shri · © {new Date().getFullYear()}</FooterText>
    </FooterContainer>
  );
}

export default Footer;
