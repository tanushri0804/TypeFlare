import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// ─── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

const softGlow = keyframes`
  0%, 100% { text-shadow: 0 0 20px rgba(192, 132, 252, 0.3); }
  50%       { text-shadow: 0 0 40px rgba(192, 132, 252, 0.6), 0 0 80px rgba(192, 132, 252, 0.2); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(192, 132, 252, 0.3); }
  50%       { box-shadow: 0 0 0 12px rgba(192, 132, 252, 0); }
`;

// ─── Layout ────────────────────────────────────────────────────────────────────

const Page = styled.div`
  min-height: calc(100vh - 65px);
  background: #0f0f0f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem 6rem;
  position: relative;
  overflow: hidden;
`;

const Noise = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  pointer-events: none;
  opacity: 0.4;
`;

// ─── Hero ──────────────────────────────────────────────────────────────────────

const Hero = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin-bottom: 5rem;
`;

const EyebrowTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(192, 132, 252, 0.1);
  border: 1px solid rgba(192, 132, 252, 0.2);
  border-radius: 50px;
  padding: 0.35rem 1rem;
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  color: #c084fc;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeUp} 0.5s ease-out 0.1s forwards;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #c084fc;
    animation: ${blink} 1.5s ease-in-out infinite;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.8rem, 7.5vw, 5.5rem);
  font-weight: 900;
  line-height: 1.08;
  margin: 0 0 1.5rem;
  color: #e2e2e2;
  letter-spacing: -2px;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease-out 0.25s forwards;
`;

const Accent = styled.span`
  color: #c084fc;
  animation: ${softGlow} 4s ease-in-out infinite;
  display: inline-block;
`;

const Sub = styled.p`
  font-size: 1.05rem;
  color: rgba(226, 226, 226, 0.4);
  line-height: 1.8;
  max-width: 480px;
  margin: 0 auto 3rem;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease-out 0.4s forwards;
`;

// ─── Terminal demo ────────────────────────────────────────────────────────────

const Terminal = styled.div`
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  padding: 0.6rem 0.8rem 1.4rem;
  max-width: 600px;
  margin: 0 auto 3rem;
  text-align: left;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease-out 0.55s forwards;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.4rem 0.8rem;
`;

const Dot = styled.span`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${props => props.color};
  opacity: 0.7;
`;

const TerminalText = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  color: rgba(226, 226, 226, 0.55);
  line-height: 1.6;
  padding: 0 0.4rem;

  .typed { color: #e2e2e2; }
  .purple { color: #c084fc; }
  .dim { color: rgba(226, 226, 226, 0.25); }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 0.95em;
  background: #c084fc;
  vertical-align: text-bottom;
  margin-left: 1px;
  border-radius: 1px;
  animation: ${blink} 0.9s step-end infinite;
`;

// ─── CTA ──────────────────────────────────────────────────────────────────────

const CTARow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease-out 0.7s forwards;
`;

const PrimaryBtn = styled(Link)`
  display: inline-block;
  padding: 0.9rem 2.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  color: #0f0f0f;
  background: #c084fc;
  border-radius: 10px;
  transition: all 0.25s ease;
  font-family: 'Courier New', monospace;
  animation: ${pulse} 2.5s ease-in-out 2s infinite;

  &:hover {
    background: #d8b4fe;
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(192, 132, 252, 0.4);
  }
`;

const SecondaryBtn = styled(Link)`
  display: inline-block;
  padding: 0.9rem 2rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  color: rgba(226, 226, 226, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.25s ease;
  font-family: 'Courier New', monospace;

  &:hover {
    color: #e2e2e2;
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
  }
`;

// ─── Stats strip ──────────────────────────────────────────────────────────────

const StatsStrip = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 3.5rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease-out 0.9s forwards;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNum = styled.p`
  font-size: 2rem;
  font-weight: 900;
  color: #c084fc;
  margin: 0 0 0.2rem;
  font-family: 'Courier New', monospace;
  letter-spacing: -1px;
`;

const StatLabel = styled.p`
  font-size: 0.72rem;
  color: rgba(226, 226, 226, 0.25);
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin: 0;
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.07);
  align-self: center;
`;

// ─── Demo text & typing animation ────────────────────────────────────────────

const DEMO  = "the quick brown fox jumps over the lazy dog";
const SPEED = 95;

function Landing() {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (typed >= DEMO.length) return;
    const id = setTimeout(() => setTyped(t => t + 1), SPEED);
    return () => clearTimeout(id);
  }, [typed]);

  return (
    <Page>
      <Noise />

      <Hero>
        <EyebrowTag>typing speed test</EyebrowTag>

        <Title>
          How fast do
          <br />
          you <Accent>actually</Accent> type?
        </Title>

        <Sub>
          Real-time WPM, accuracy tracking, multiple modes.
          No accounts. No fluff. Just type.
        </Sub>

        <Terminal>
          <TitleBar>
            <Dot color="#ff5f56" />
            <Dot color="#ffbd2e" />
            <Dot color="#27c93f" />
          </TitleBar>
          <TerminalText>
            <span className="purple">~ typeflare</span>
            <br />
            <span className="dim">start typing to begin your test</span>
            <br />
            <br />
            <span className="typed">{DEMO.slice(0, typed)}</span>
            <span className="dim">{DEMO.slice(typed)}</span>
            <Cursor />
          </TerminalText>
        </Terminal>

        <CTARow>
          <PrimaryBtn to="/test">Start Test</PrimaryBtn>
          <SecondaryBtn to="/results">View History</SecondaryBtn>
        </CTARow>
      </Hero>

      <StatsStrip>
        <StatItem>
          <StatNum>4</StatNum>
          <StatLabel>test modes</StatLabel>
        </StatItem>
        <Divider />
        <StatItem>
          <StatNum>60s</StatNum>
          <StatLabel>default time</StatLabel>
        </StatItem>
        <Divider />
        <StatItem>
          <StatNum>live</StatNum>
          <StatLabel>wpm tracking</StatLabel>
        </StatItem>
        <Divider />
        <StatItem>
          <StatNum>∞</StatNum>
          <StatLabel>history saved</StatLabel>
        </StatItem>
      </StatsStrip>
    </Page>
  );
}

export default Landing;
