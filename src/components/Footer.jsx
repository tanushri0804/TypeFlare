import React from "react";
import styled from "styled-components";

// Mint green color theme
const colors = {
  primary: "#88c9a1",
  text: "#2d3e40",
};

const FooterContainer = styled.footer`
  background: ${colors.primary};
  color: ${colors.text};
  padding: 1.5rem;
  text-align: center;
  margin-top: auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterText>Made with 💚 by Tanu Shri | © {new Date().getFullYear()}</FooterText>
    </FooterContainer>
  );
}

export default Footer;