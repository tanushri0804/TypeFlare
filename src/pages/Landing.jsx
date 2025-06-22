import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Mint green color theme with enhancements
const colors = {
  primary: "#88c9a1",
  secondary: "#4a7c59",
  accent: "#f8f9fa",
  light: "#ffffff",
  highlight: "#d4e6d9",
  text: "#2d3e40",
  dark: "#1a2e35",
};

// Enhanced Animations
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Container = styled.div`
  padding: 6rem 1rem;
  text-align: center;
  background: linear-gradient(135deg, ${colors.highlight} 0%, ${colors.light} 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const Heading = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  color: ${colors.dark};
  font-weight: 800;
  line-height: 1.2;
  animation: ${fadeIn} 1s ease-out forwards;
  text-shadow: 0 2px 10px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Highlight = styled.span`
  color: ${colors.secondary};
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 15px;
    background: rgba(138, 201, 161, 0.3);
    z-index: -1;
    border-radius: 20px;
    animation: ${scaleIn} 1s ease-out 0.5s both;
  }
`;

const Subtext = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: ${colors.text};
  max-width: 700px;
  line-height: 1.6;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 0.3s forwards;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Button = styled(Link)`
  padding: 1.3rem 3.5rem;
  font-size: 1.2rem;
  background: linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%);
  color: ${colors.light};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 10px 25px rgba(74, 124, 89, 0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 0.6s forwards;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
    z-index: -1;
    transition: all 0.4s ease;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 30px rgba(74, 124, 89, 0.5);
    
    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const FeaturesSection = styled.section`
  max-width: 1200px;
  margin: 5rem auto;
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${colors.dark};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${colors.secondary};
    border-radius: 2px;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background: ${colors.light};
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid ${colors.highlight};
  opacity: 0;
  transform: translateY(30px);
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || '0.3s'};

  &:hover {
    transform: translateY(-15px) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, ${colors.light} 0%, ${colors.highlight} 100%);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  color: ${colors.secondary};
  display: inline-block;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1.5rem;
  color: ${colors.dark};
  font-size: 1.5rem;
  font-weight: 700;
`;

const FeatureDesc = styled.p`
  color: ${colors.text};
  font-size: 1.1rem;
  line-height: 1.7;
  opacity: 0.9;
`;

const FloatingShapes = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
`;

const Shape = styled.div`
  position: absolute;
  border-radius: ${props => props.circle ? '50%' : '20px'};
  background: rgba(138, 201, 161, 0.15);
  filter: blur(${props => props.blur || '0px'});
  animation: ${float} ${props => props.duration || '15s'} linear infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const Testimonials = styled.div`
  max-width: 1000px;
  margin: 5rem auto;
  padding: 3rem;
  background: ${colors.light};
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 1.2s forwards;
`;

const TestimonialText = styled.blockquote`
  font-size: 1.4rem;
  color: ${colors.text};
  line-height: 1.8;
  font-style: italic;
  margin-bottom: 2rem;
  position: relative;
  
  &::before, &::after {
    content: '"';
    font-size: 3rem;
    color: ${colors.primary};
    opacity: 0.3;
    position: absolute;
  }
  
  &::before {
    top: -20px;
    left: -30px;
  }
  
  &::after {
    bottom: -40px;
    right: -30px;
  }
`;

const TestimonialAuthor = styled.p`
  font-weight: 600;
  color: ${colors.secondary};
  font-size: 1.2rem;
`;

function Landing() {
  // Create floating shapes
  const shapes = [
    { id: 1, size: 120, left: 5, top: 10, circle: true, duration: '20s', delay: '0s', blur: '5px' },
    { id: 2, size: 80, left: 80, top: 20, circle: false, duration: '25s', delay: '2s', blur: '3px' },
    { id: 3, size: 150, left: 30, top: 60, circle: true, duration: '30s', delay: '4s', blur: '7px' },
    { id: 4, size: 100, left: 70, top: 70, circle: false, duration: '22s', delay: '1s', blur: '2px' },
  ];

  return (
    <Container>
      <FloatingShapes>
        {shapes.map(shape => (
          <Shape
            key={shape.id}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: `${shape.left}%`,
              top: `${shape.top}%`,
            }}
            circle={shape.circle}
            duration={shape.duration}
            delay={shape.delay}
            blur={shape.blur}
          />
        ))}
      </FloatingShapes>

      <HeroSection>
        <Heading>
          Master Your Typing with <Highlight>TypeFlare</Highlight>
        </Heading>
        <Subtext>
          Join thousands of developers, writers, and professionals who use our immersive typing platform to improve their speed, accuracy, and productivity.
        </Subtext>
        <Button to="/test">Start Free Typing Test</Button>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose TypeFlare</SectionTitle>
        <Features>
          <FeatureCard delay="0.4s">
            <FeatureIcon delay="0.2s">⚡</FeatureIcon>
            <FeatureTitle>Real-time Analytics</FeatureTitle>
            <FeatureDesc>
              Get instant feedback on your typing performance with detailed metrics including WPM, accuracy, and error rate as you type.
            </FeatureDesc>
          </FeatureCard>
          <FeatureCard delay="0.6s">
            <FeatureIcon delay="0.4s">📈</FeatureIcon>
            <FeatureTitle>Progress Tracking</FeatureTitle>
            <FeatureDesc>
              Visualize your improvement over time with beautiful charts and historical data to keep you motivated.
            </FeatureDesc>
          </FeatureCard>
          <FeatureCard delay="0.8s">
            <FeatureIcon delay="0.6s">🌐</FeatureIcon>
            <FeatureTitle>Diverse Content</FeatureTitle>
            <FeatureDesc>
              Practice with programming code, literature excerpts, or random words - we've got content for every need.
            </FeatureDesc>
          </FeatureCard>
        </Features>
      </FeaturesSection>

      <Testimonials>
        <TestimonialText>
          TypeFlare helped me increase my typing speed by 40% in just two weeks. The clean interface and detailed feedback made practice sessions enjoyable and effective.
        </TestimonialText>
        <TestimonialAuthor>- Sarah K., Frontend Developer</TestimonialAuthor>
      </Testimonials>
    </Container>
  );
}

export default Landing;