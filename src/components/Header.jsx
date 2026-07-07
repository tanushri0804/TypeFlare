import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  padding: 1.1rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 15, 15, 0.9);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Logo = styled(Link)`
  color: #e2e2e2;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 1px;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  transition: color 0.2s ease;

  span {
    color: #c084fc;
  }

  &:hover {
    color: #fff;
  }
`;

const TagLine = styled.p`
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.18);
  letter-spacing: 3px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  margin: 0;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo to="/">
        type<span>flare</span>
      </Logo>
      <TagLine>test your speed</TagLine>
    </HeaderContainer>
  );
}

export default Header;
