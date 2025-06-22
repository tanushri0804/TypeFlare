import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Mint green color theme
const colors = {
  primary: "#88c9a1",
  secondary: "#4a7c59",
  accent: "#f8f9fa",
  light: "#ffffff",
  highlight: "#d4e6d9",
  text: "#2d3e40",
};

const Container = styled.div`
  padding: 2rem;
  text-align: center;
  min-height: calc(100vh - 120px);
  background: ${colors.highlight};
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${colors.text};
  font-weight: 700;
`;

const ResultsContainer = styled.div`
  background: ${colors.light};
  padding: 2.5rem;
  border-radius: 16px;
  max-width: 800px;
  margin: 0 auto 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.highlight};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
`;

const StatCard = styled.div`
  padding: 1.5rem;
  border-radius: 16px;
  background: ${props => props.highlight ? colors.highlight : colors.light};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.highlight};
`;

const StatValue = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  color: ${colors.secondary};
`;

const StatLabel = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0 0;
  color: ${colors.text};
  opacity: 0.8;
`;

const HistoryTitle = styled.h3`
  margin-top: 2rem;
  color: ${colors.text};
  font-size: 1.5rem;
`;

const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
`;

const TableHeader = styled.th`
  padding: 1rem;
  background: ${colors.primary};
  color: ${colors.light};
  text-align: left;
  font-weight: 600;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${colors.highlight};
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${colors.highlight};
  color: ${colors.text};
`;

const Button = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  background: ${colors.secondary};
  color: ${colors.light};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(74, 124, 89, 0.3);
  margin-top: 1.5rem;

  &:hover {
    background: ${colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(74, 124, 89, 0.4);
  }
`;

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (location.state?.results) {
      setCurrentResult(location.state.results);
    }

    const savedResults = JSON.parse(localStorage.getItem('typingResults') || '[]');
    setHistory(savedResults.reverse());
  }, [location.state]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Container>
      <Heading>Your Typing Results</Heading>
      
      {currentResult && (
        <ResultsContainer>
          <h3>Latest Test</h3>
          <StatsGrid>
            <StatCard highlight>
              <StatValue>{currentResult.wpm}</StatValue>
              <StatLabel>Words Per Minute</StatLabel>
            </StatCard>
            <StatCard highlight>
              <StatValue>{currentResult.accuracy}%</StatValue>
              <StatLabel>Accuracy</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{currentResult.correctChars}</StatValue>
              <StatLabel>Correct Characters</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{currentResult.incorrectChars}</StatValue>
              <StatLabel>Incorrect Characters</StatLabel>
            </StatCard>
          </StatsGrid>
        </ResultsContainer>
      )}
      
      {history.length > 0 && (
        <ResultsContainer>
          <HistoryTitle>Your Test History</HistoryTitle>
          <HistoryTable>
            <thead>
              <tr>
                <TableHeader>Date</TableHeader>
                <TableHeader>WPM</TableHeader>
                <TableHeader>Accuracy</TableHeader>
                <TableHeader>Time</TableHeader>
              </tr>
            </thead>
            <tbody>
              {history.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(result.date)}</TableCell>
                  <TableCell>{result.wpm}</TableCell>
                  <TableCell>{result.accuracy}%</TableCell>
                  <TableCell>{result.timeTaken}s</TableCell>
                </TableRow>
              ))}
            </tbody>
          </HistoryTable>
        </ResultsContainer>
      )}
      
      <Button onClick={() => navigate('/test')}>Take Another Test</Button>
    </Container>
  );
}

export default Results;