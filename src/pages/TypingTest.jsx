import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Mint green color theme
const colors = {
  primary: "#88c9a1",
  secondary: "#4a7c59",
  accent: "#f8f9fa",
  light: "#ffffff",
  highlight: "#d4e6d9",
  text: "#2d3e40",
  correct: "#4a7c59",
  incorrect: "#e56b6f",
  current: "#88c9a1",
};

const quotes = [
  "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet.",
  "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of developers.",
  "Typing is the process of writing or inputting text by pressing keys on a typewriter, computer keyboard, or touchscreen.",
  "Programming is the art of telling another human what one wants the computer to do. Communication is the most important skill.",
  "The only way to learn a new programming language is by writing programs in it. Start with simple programs and build up.",
  "Clean code always looks like it was written by someone who cares. Strive to write code that is easy to understand.",
  "The best error message is the one that never shows up. Write defensive code that handles edge cases gracefully.",
  "Debugging is twice as hard as writing the code in the first place. Write simple, clear code that's easy to debug.",
  "The proper use of comments is to compensate for our failure to express ourself in code. Write self-documenting code.",
];

const Container = styled.div`
  padding: 2rem;
  text-align: center;
  min-height: calc(100vh - 120px);
  background: ${colors.highlight};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${colors.text};
  font-weight: 700;
`;

const Timer = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.timeLeft <= 10 ? colors.incorrect : colors.secondary};
  margin-bottom: 1.5rem;
`;

const QuoteContainer = styled.div`
  background: ${colors.light};
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: left;
  line-height: 1.8;
`;

const QuoteText = styled.p`
  font-size: 1.3rem;
  color: ${colors.text};
  white-space: pre-wrap;
`;

const Character = styled.span`
  color: ${props => {
    if (props.isCurrent && props.isIncorrect) return colors.incorrect;
    if (props.isCurrent) return colors.current;
    if (props.isCorrect === true) return colors.correct;
    if (props.isCorrect === false) return colors.incorrect;
    return colors.text;
  }};
  background-color: ${props => props.isCurrent ? colors.highlight : "transparent"};
  border-radius: 3px;
  font-weight: ${props => props.isCurrent ? "600" : "normal"};
`;

const TextArea = styled.textarea`
  width: 90%;
  max-width: 800px;
  height: 150px;
  font-size: 1.2rem;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 16px;
  border: 2px solid ${colors.primary};
  resize: none;
  transition: all 0.3s ease;
  background: ${colors.light};
  color: ${colors.text};

  &:focus {
    outline: none;
    border-color: ${colors.secondary};
    box-shadow: 0 0 0 4px ${colors.highlight};
  }

  &:disabled {
    background: ${colors.highlight};
    cursor: not-allowed;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: ${colors.light};
  padding: 1.5rem;
  border-radius: 16px;
  min-width: 150px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.highlight};
`;

const StatValue = styled.p`
  font-size: 2rem;
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
  margin: 1rem;

  &:hover {
    background: ${colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(74, 124, 89, 0.4);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

function TypingTest() {
  const [quote, setQuote] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      completeTest();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (isRunning && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isRunning]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setTotalTyped(value.length);

    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === quote[i]) correct++;
    }
    setCorrectChars(correct);

    if (value.length === quote.length && value === quote) {
      completeTest();
    }
  };

  const startTest = () => {
    setInput("");
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setTimeLeft(60);
    setCorrectChars(0);
    setTotalTyped(0);
    setIsRunning(true);
    setTestCompleted(false);
    setResults(null);
    setTimeout(() => {
      if (textareaRef.current) textareaRef.current.focus();
    }, 0);
  };

  const completeTest = () => {
    setIsRunning(false);
    setTestCompleted(true);
    
    const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
    const wpm = Math.round((correctChars / 5 / ((60 - timeLeft) / 60)) || 0;
    
    const testResults = {
      wpm,
      accuracy,
      correctChars,
      incorrectChars: totalTyped - correctChars,
      timeTaken: 60 - timeLeft,
      date: new Date().toISOString()
    };
    
    setResults(testResults);
    
    const previousResults = JSON.parse(localStorage.getItem('typingResults') || '[]');
    localStorage.setItem('typingResults', JSON.stringify([...previousResults, testResults]));
  };

  const viewResults = () => {
    navigate('/results', { state: { results } });
  };

  const renderQuote = () => {
    return quote.split('').map((char, index) => {
      const isCurrent = index === input.length;
      const isCorrect = input[index] === char;
      const isIncorrect = input[index] && input[index] !== char;
      
      return (
        <Character
          key={index}
          isCurrent={isCurrent}
          isCorrect={index < input.length ? isCorrect : null}
          isIncorrect={isIncorrect}
        >
          {char}
        </Character>
      );
    });
  };

  const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
  const wpm = Math.round((correctChars / 5 / ((60 - timeLeft) / 60)) || 0;

  return (
    <Container>
      <Heading>Typing Test</Heading>
      
      <Timer timeLeft={timeLeft}>
        {timeLeft}s {!isRunning && timeLeft === 60 ? " (Ready)" : ""}
        {!isRunning && timeLeft < 60 && timeLeft > 0 ? " (Paused)" : ""}
      </Timer>
      
      <QuoteContainer>
        <QuoteText>{renderQuote()}</QuoteText>
      </QuoteContainer>
      
      <TextArea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        disabled={!isRunning || timeLeft === 0}
        placeholder={isRunning ? "Start typing here..." : "Click 'Start Test' to begin"}
      />
      
      <StatsContainer>
        <StatCard>
          <StatValue>{wpm}</StatValue>
          <StatLabel>Words Per Minute</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{accuracy}%</StatValue>
          <StatLabel>Accuracy</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{correctChars}</StatValue>
          <StatLabel>Correct</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalTyped - correctChars}</StatValue>
          <StatLabel>Incorrect</StatLabel>
        </StatCard>
      </StatsContainer>
      
      {testCompleted ? (
        <>
          <Button onClick={startTest}>Try Again</Button>
          <Button onClick={viewResults}>View Results</Button>
        </>
      ) : (
        <Button onClick={startTest} disabled={isRunning && timeLeft > 0}>
          {isRunning ? "Restart Test" : "Start Test"}
        </Button>
      )}
    </Container>
  );
}

export default TypingTest;