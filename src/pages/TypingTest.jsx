import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

// ─── Content pools ─────────────────────────────────────────────────────────────

// Long meaningful passages — split into words, looped if needed
const PASSAGES = [
  `The art of programming is the art of organizing complexity. A programmer is ideally an essayist who works with traditional aesthetic and literary forms as well as mathematical concepts to communicate the way an algorithm works and to convince a reader that the results will be correct. Writing clean readable code is not just about following rules it is about caring enough to craft something that another human being can understand and maintain. Every line of code is a decision and every decision reflects the values of the person who wrote it. The best programmers are not the ones who know the most tricks but the ones who write the simplest solutions to complex problems.`,

  `Touch typing is the skill of typing without looking at the keyboard. It is one of the most valuable skills a knowledge worker can develop. When you type without thinking about the keys your fingers become an extension of your thoughts and ideas flow directly from your mind to the screen without interruption. Speed matters less than accuracy in the beginning. Focus on hitting the right keys every time and speed will follow naturally as your muscle memory develops over weeks and months of consistent practice.`,

  `Good design is about solving problems elegantly. It means making something that works well looks good and feels right to use. Design is not decoration it is the way things work. The best designed tools disappear and let you focus entirely on what you are trying to accomplish. Whether you are designing software or furniture or a city street the principles remain the same understand who will use it what they need and what might get in their way then remove every obstacle between the person and their goal.`,

  `Reading is to the mind what exercise is to the body. A well read person carries the distilled wisdom of thousands of lifetimes in their memory ready to be applied to any situation. The habit of reading regularly even for just thirty minutes a day compounds over years into a profound advantage. Books allow us to have intimate conversations with the greatest thinkers in history. They let us live a thousand lives and understand perspectives vastly different from our own. Never stop reading and never stop learning because the moment you think you know enough is the moment you start falling behind.`,

  `The universe is under no obligation to make sense to you. Science is not a collection of facts but a method of investigating reality through observation experiment and reasoning. Every scientific theory is a best current explanation subject to revision when better evidence arrives. This is not a weakness it is the greatest strength of science. The willingness to change your mind in the face of new evidence is intellectual courage of the highest order. Curiosity is the engine of human progress and skepticism is its steering wheel.`,
];

// Build a large word pool from a random passage, repeated enough to never run out
function buildWordPool(mode) {
  if (mode === "quotes") {
    // cycle through all passages
    const all = PASSAGES.join(" ");
    return all.split(" ").filter(w => w.length > 0);
  }
  if (mode === "code") {
    const CODE = [
      "const add = (a, b) => a + b;",
      "function greet(name) { return `Hello, ${name}!`; }",
      "const arr = [1, 2, 3].map(x => x * 2);",
      "async function fetchData(url) { const res = await fetch(url); return res.json(); }",
      "const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };",
      "class Node { constructor(val) { this.val = val; this.next = null; } }",
      "const sum = arr => arr.reduce((acc, x) => acc + x, 0);",
      "const unique = arr => [...new Set(arr)];",
      "const sleep = ms => new Promise(res => setTimeout(res, ms));",
      "const clamp = (n, min, max) => Math.min(Math.max(n, min), max);",
    ].join(" ");
    return CODE.split(" ").filter(w => w.length > 0);
  }
  // words mode — pick one passage and repeat it
  const passage = PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
  const words = passage.split(" ").filter(w => w.length > 0);
  // repeat 4x so a 120s test never runs out
  return [...words, ...words, ...words, ...words];
}

// ─── Animations ────────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const popIn = keyframes`
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
`;

const shake = keyframes`
  0%,100% { transform: translateX(0); }
  25%      { transform: translateX(-5px); }
  75%      { transform: translateX(5px); }
`;

const cursorBlink = keyframes`
  0%,100% { opacity: 1; }
  50%      { opacity: 0; }
`;

const urgentPulse = keyframes`
  0%,100% { color: #f87171; }
  50%      { color: #fca5a5; }
`;

// ─── Page shell — full viewport, no scroll ─────────────────────────────────────

const Page = styled.div`
  height: calc(100vh - 65px);
  background: #0f0f0f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

// ─── Top bar: selectors ────────────────────────────────────────────────────────

const TopBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: ${fadeIn} 0.4s ease-out forwards;
`;

const PillGroup = styled.div`
  display: flex;
  gap: 0.2rem;
  background: #1a1a1a;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 50px;
  padding: 0.22rem;
`;

const Pill = styled.button`
  padding: 0.32rem 1rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  transition: all 0.15s ease;
  background: ${p => p.active ? "#c084fc" : "transparent"};
  color: ${p => p.active ? "#0f0f0f" : "rgba(226,226,226,0.3)"};

  &:hover:not(:disabled) {
    color: ${p => p.active ? "#0f0f0f" : "rgba(226,226,226,0.75)"};
  }
  &:disabled { cursor: not-allowed; opacity: 0.3; }
`;

// ─── Main two-column area ──────────────────────────────────────────────────────

const Main = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
  align-items: start;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// ─── LEFT PANEL ───────────────────────────────────────────────────────────────

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const TimerNum = styled.div`
  font-size: 5.5rem;
  font-weight: 900;
  font-family: 'Courier New', monospace;
  letter-spacing: -4px;
  line-height: 1;
  margin-bottom: 1rem;
  user-select: none;
  color: ${p => p.urgent ? "#f87171" : "#e2e2e2"};
  animation: ${p => p.urgent ? css`${urgentPulse} 0.7s ease-in-out infinite` : "none"};
  transition: color 0.3s ease;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255,255,255,0.06);
  margin: 0.8rem 0;
`;

const StatRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 0.5rem;
  margin-top: 0.4rem;
`;

const StatBox = styled.div`
  text-align: left;
`;

const StatVal = styled.div`
  font-size: 1.6rem;
  font-weight: 900;
  font-family: 'Courier New', monospace;
  color: #c084fc;
  letter-spacing: -1px;
  line-height: 1;
`;

const StatLbl = styled.div`
  font-size: 0.62rem;
  color: rgba(226,226,226,0.25);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 0.2rem;
`;

// ─── RIGHT PANEL ──────────────────────────────────────────────────────────────

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TextBox = styled.div`
  background: #1a1a1a;
  border: 1px solid ${p => p.shaking ? "#f87171" : "rgba(255,255,255,0.07)"};
  border-radius: 14px;
  padding: 1.2rem 1.5rem;
  cursor: text;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  animation: ${p => p.shaking ? css`${shake} 0.35s ease` : "none"};

  &.focused {
    border-color: rgba(192,132,252,0.35);
    box-shadow: 0 0 0 1px rgba(192,132,252,0.08);
  }
`;

const WordsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.55rem;
  font-size: 1.15rem;
  font-family: 'Courier New', monospace;
  line-height: 1.55;
  user-select: none;
  text-align: left;
  max-height: 155px;
  overflow: hidden;
`;

const Word = styled.span`
  display: inline-block;
  color: ${p => {
    if (p.status === "correct") return "rgba(226,226,226,0.7)";
    if (p.status === "wrong")   return "#f87171";
    if (p.status === "current") return "#e2e2e2";
    return "rgba(226,226,226,0.18)";
  }};
  border-bottom: 2px solid ${p => p.status === "current" ? "#c084fc" : "transparent"};
  padding-bottom: 1px;
  transition: color 0.1s ease;
`;

const Letter = styled.span`
  position: relative;
  color: ${p => {
    if (p.correct === true)  return "#a3e635";
    if (p.correct === false) return "#f87171";
    return "inherit";
  }};

  ${p => p.isCursor && css`
    &::before {
      content: '';
      position: absolute;
      left: -1px;
      top: 4px;
      bottom: 4px;
      width: 2px;
      background: #c084fc;
      border-radius: 2px;
      animation: ${cursorBlink} 0.85s step-end infinite;
    }
  `}
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
`;

// ─── Bottom bar ────────────────────────────────────────────────────────────────

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Hint = styled.span`
  font-size: 0.68rem;
  color: rgba(226,226,226,0.18);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const Btn = styled.button`
  padding: 0.55rem 1.4rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  border-radius: 8px;
  border: 1px solid ${p => p.primary ? "transparent" : "rgba(255,255,255,0.08)"};
  cursor: pointer;
  transition: all 0.18s ease;
  background: ${p => p.primary ? "#c084fc" : "#1a1a1a"};
  color: ${p => p.primary ? "#0f0f0f" : "rgba(226,226,226,0.5)"};

  &:hover {
    transform: translateY(-2px);
    background: ${p => p.primary ? "#d8b4fe" : "#242424"};
    color: ${p => p.primary ? "#0f0f0f" : "#e2e2e2"};
    box-shadow: ${p => p.primary ? "0 4px 16px rgba(192,132,252,0.35)" : "none"};
  }
  &:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }
`;

// ─── Results overlay ───────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15,15,15,0.92);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ResultCard = styled.div`
  background: #1a1a1a;
  border: 1px solid rgba(192,132,252,0.2);
  border-radius: 20px;
  padding: 2.5rem 3rem;
  text-align: center;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 30px 80px rgba(0,0,0,0.5);
  animation: ${popIn} 0.35s cubic-bezier(0.175,0.885,0.32,1.275) forwards;
`;

const ResultTitle = styled.p`
  font-family: 'Courier New', monospace;
  font-size: 0.72rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(226,226,226,0.25);
  margin: 0 0 1.2rem;
`;

const BigWPM = styled.p`
  font-size: 5.5rem;
  font-weight: 900;
  color: #c084fc;
  font-family: 'Courier New', monospace;
  margin: 0;
  letter-spacing: -4px;
  line-height: 1;
`;

const WPMLabel = styled.p`
  font-size: 0.72rem;
  letter-spacing: 3px;
  color: rgba(226,226,226,0.25);
  text-transform: uppercase;
  margin: 0.3rem 0 2rem;
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
  margin-bottom: 2rem;
`;

const ResultItem = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 10px;
  padding: 0.9rem;
`;

const ResultVal = styled.p`
  font-size: 1.35rem;
  font-weight: 800;
  color: #e2e2e2;
  font-family: 'Courier New', monospace;
  margin: 0 0 0.15rem;
`;

const ResultLbl = styled.p`
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: rgba(226,226,226,0.3);
  text-transform: uppercase;
  margin: 0;
`;

const ResultBtns = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: center;
`;

// ─── Constants ────────────────────────────────────────────────────────────────

const DURATIONS = [15, 30, 60, 120];
const MODES     = ["words", "quotes", "code"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TypingTest() {
  const navigate = useNavigate();

  const [mode, setMode]                 = useState("words");
  const [duration, setDuration]         = useState(60);
  const [wordPool, setWordPool]         = useState([]); // full infinite pool
  const [currentWord, setCurrentWord]   = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [wordStatuses, setWordStatuses] = useState([]);
  const [timeLeft, setTimeLeft]         = useState(60);
  const [isRunning, setIsRunning]       = useState(false);
  const [testDone, setTestDone]         = useState(false);
  const [results, setResults]           = useState(null);
  const [shaking, setShaking]           = useState(false);
  const [isFocused, setIsFocused]       = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const [wrongWords, setWrongWords]     = useState(0);
  const [correctChars, setCorrectChars] = useState(0);

  const inputRef  = useRef(null);
  const timerRef  = useRef(null);
  const startTime = useRef(null);

  const initWords = useCallback((m, d) => {
    const pool = buildWordPool(m);
    setWordPool(pool);
    setWordStatuses(new Array(pool.length).fill("pending"));
    setCurrentWord(0);
    setCurrentInput("");
    setTimeLeft(d);
    setIsRunning(false);
    setTestDone(false);
    setResults(null);
    setCorrectWords(0);
    setWrongWords(0);
    setCorrectChars(0);
    startTime.current = null;
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => { initWords(mode, duration); }, [mode, duration, initWords]);

  useEffect(() => {
    if (!isRunning) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finishTest(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const finishTest = useCallback(() => {
    setIsRunning(false);
    setTestDone(true);
    setCorrectWords(cw => {
      setWrongWords(ww => {
        setCorrectChars(cc => {
          const elapsed  = startTime.current ? (Date.now() - startTime.current) / 1000 / 60 : duration / 60;
          const wpm      = elapsed > 0 ? Math.round(cw / elapsed) : 0;
          const total    = cw + ww;
          const accuracy = total > 0 ? Math.round((cw / total) * 100) : 0;
          const r = { wpm, accuracy, correctWords: cw, wrongWords: ww, correctChars: cc, duration, mode, date: new Date().toISOString() };
          setResults(r);
          const prev = JSON.parse(localStorage.getItem("typingResults") || "[]");
          localStorage.setItem("typingResults", JSON.stringify([...prev, r]));
          return cc;
        });
        return ww;
      });
      return cw;
    });
  }, [duration, mode]);

  const handleKey = useCallback((e) => {
    if (testDone) return;

    if (!isRunning && e.key !== "Tab") {
      setIsRunning(true);
      startTime.current = Date.now();
    }

    if (e.key === "Tab") {
      e.preventDefault();
      initWords(mode, duration);
      return;
    }

    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (currentInput.trim() === "") return;

      const isCorrect = currentInput.trim() === wordPool[currentWord];
      setWordStatuses(prev => {
        const next = [...prev];
        next[currentWord] = isCorrect ? "correct" : "wrong";
        return next;
      });

      if (isCorrect) {
        setCorrectWords(c => c + 1);
        setCorrectChars(c => c + wordPool[currentWord].length);
      } else {
        setWrongWords(w => w + 1);
        setShaking(true);
        setTimeout(() => setShaking(false), 350);
      }

      // no finish condition — timer drives the end
      setCurrentWord(prev => prev + 1);
      setCurrentInput("");
      return;
    }

    if (e.key === "Backspace") { setCurrentInput(v => v.slice(0, -1)); return; }
    if (e.key.length === 1)    { setCurrentInput(v => v + e.key); }
  }, [testDone, isRunning, currentInput, currentWord, wordPool, mode, duration, initWords]);

  const focusInput = () => { inputRef.current?.focus(); setIsFocused(true); };

  const elapsed   = startTime.current ? (Date.now() - startTime.current) / 1000 / 60 : 0;
  const liveWpm   = elapsed > 0 ? Math.round(correctWords / elapsed) : 0;
  const liveTotal = correctWords + wrongWords;
  const liveAcc   = liveTotal > 0 ? Math.round((correctWords / liveTotal) * 100) : 100;

  // sliding window — show words around current position
  const WINDOW_BEFORE = 0;   // don't show completed words (they scrolled away)
  const WINDOW_AFTER  = 45;
  const windowStart = Math.max(0, currentWord - WINDOW_BEFORE);
  const windowEnd   = Math.min(wordPool.length, currentWord + WINDOW_AFTER);
  const visibleWords = wordPool.slice(windowStart, windowEnd);

  return (
    <Page onClick={focusInput}>
      <HiddenInput
        ref={inputRef}
        onKeyDown={handleKey}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        readOnly
      />

      {/* ── mode + duration selectors ── */}
      <TopBar>
        <PillGroup>
          {MODES.map(m => (
            <Pill key={m} active={mode === m}
              onClick={e => { e.stopPropagation(); if (!isRunning) setMode(m); }}
              disabled={isRunning}
            >{m}</Pill>
          ))}
        </PillGroup>
        <PillGroup>
          {DURATIONS.map(d => (
            <Pill key={d} active={duration === d}
              onClick={e => { e.stopPropagation(); if (!isRunning) setDuration(d); }}
              disabled={isRunning}
            >{d}s</Pill>
          ))}
        </PillGroup>
      </TopBar>

      {/* ── left stats + right typing ── */}
      <Main>
        {/* LEFT */}
        <LeftPanel>
          <TimerNum urgent={timeLeft <= 10 && isRunning}>
            {timeLeft}
          </TimerNum>

          <Divider />

          <StatRow>
            <StatBox>
              <StatVal>{isRunning ? liveWpm : "–"}</StatVal>
              <StatLbl>wpm</StatLbl>
            </StatBox>
            <StatBox>
              <StatVal>{isRunning ? `${liveAcc}%` : "–"}</StatVal>
              <StatLbl>acc</StatLbl>
            </StatBox>
            <StatBox>
              <StatVal>{correctWords}</StatVal>
              <StatLbl>correct</StatLbl>
            </StatBox>
            <StatBox>
              <StatVal>{wrongWords}</StatVal>
              <StatLbl>wrong</StatLbl>
            </StatBox>
          </StatRow>
        </LeftPanel>

        {/* RIGHT */}
        <RightPanel>
          <TextBox
            shaking={shaking}
            className={isFocused || isRunning ? "focused" : ""}
            onClick={focusInput}
          >
            <WordsWrapper>
              {visibleWords.map((word, vi) => {
                const wi = windowStart + vi; // actual index in pool
                const status = wi === currentWord ? "current" : wordStatuses[wi];
                return (
                  <Word key={wi} status={status}>
                    {word.split("").map((ch, ci) => {
                      let correct = undefined;
                      if (wi < currentWord) {
                        correct = wordStatuses[wi] === "correct";
                      } else if (wi === currentWord && ci < currentInput.length) {
                        correct = currentInput[ci] === ch;
                      }
                      const isCursor = wi === currentWord && ci === currentInput.length;
                      return (
                        <Letter key={ci} correct={correct} isCursor={isCursor}>{ch}</Letter>
                      );
                    })}
                  </Word>
                );
              })}
            </WordsWrapper>
          </TextBox>

          <BottomBar>
            <Hint>tab = restart · space = next word</Hint>
            <BtnRow>
              {!isRunning && !testDone && (
                <Btn primary onClick={e => { e.stopPropagation(); initWords(mode, duration); focusInput(); }}>
                  New Test
                </Btn>
              )}
              {isRunning && (
                <Btn onClick={e => { e.stopPropagation(); initWords(mode, duration); }}>
                  Restart
                </Btn>
              )}
            </BtnRow>
          </BottomBar>
        </RightPanel>
      </Main>

      {/* ── results overlay ── */}
      {testDone && results && (
        <Overlay onClick={e => e.stopPropagation()}>
          <ResultCard>
            <ResultTitle>test complete</ResultTitle>
            <BigWPM>{results.wpm}</BigWPM>
            <WPMLabel>words per minute</WPMLabel>
            <ResultGrid>
              <ResultItem>
                <ResultVal>{results.accuracy}%</ResultVal>
                <ResultLbl>accuracy</ResultLbl>
              </ResultItem>
              <ResultItem>
                <ResultVal>{results.correctWords}</ResultVal>
                <ResultLbl>correct</ResultLbl>
              </ResultItem>
              <ResultItem>
                <ResultVal>{results.wrongWords}</ResultVal>
                <ResultLbl>wrong</ResultLbl>
              </ResultItem>
              <ResultItem>
                <ResultVal>{results.duration}s</ResultVal>
                <ResultLbl>duration</ResultLbl>
              </ResultItem>
            </ResultGrid>
            <ResultBtns>
              <Btn primary onClick={() => initWords(mode, duration)}>Try Again</Btn>              <Btn onClick={() => navigate("/results", { state: { results } })}>History</Btn>
            </ResultBtns>
          </ResultCard>
        </Overlay>
      )}
    </Page>
  );
}
