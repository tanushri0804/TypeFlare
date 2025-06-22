import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Mint green color theme
const colors = {
  primary: "#88c9a1",      // Soft mint
  secondary: "#4a7c59",    // Darker mint
  accent: "#f8f9fa",       // Off-white
  light: "#ffffff",        // White
  highlight: "#d4e6d9",    // Light mint
  text: "#2d3e40",         // Dark text
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const HeaderContainer = styled.header`
  background: ${colors.primary};
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Logo = styled(Link)`
  color: ${colors.text};
  text-decoration: none;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;

  &:hover {
    color: ${colors.secondary};
    animation: ${pulse} 1s ease infinite;
  }
`;

const NavLinks = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${colors.text};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  opacity: 0.9;

  &:hover {
    color: ${colors.secondary};
    opacity: 1;
    transform: translateY(-2px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${colors.secondary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: ${colors.secondary};
    font-weight: 600;

    &::after {
      width: 100%;
    }
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo to="/">TypeFlare</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/test">Typing Test</NavLink>
        <NavLink to="/results">Results</NavLink>
      </NavLinks>
    </HeaderContainer>
  );
}

export default Header;