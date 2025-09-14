"use client";
import { useState } from "react";
import Scoreboard from "../components/Scoreboard";
import useTimer from "../hooks/useTimer";
import useDictionary from "../hooks/useDictionary";

export default function Home() {
  const [current, setCurrent] = useState("A");
  const [scores, setScores] = useState({ A: 0, B: 0 });
  const [history, setHistory] = useState([]);
  const [inputs, setInputs] = useState({ A: "", B: "" });
  const [isChecking, setIsChecking] = useState(false);

  const { timeLeft, resetTimer, pauseTimer } = useTimer(() => handleTimeout(), 10);
  const { validateWord } = useDictionary();

  const lastLetter = history.length ? history[history.length - 1].word.slice(-1) : "";

  function switchPlayer() {
    setCurrent(current === "A" ? "B" : "A");
    resetTimer();
  }

  function handleTimeout() {
    setScores(prev => ({ ...prev, [current]: prev[current] - 1 }));
    switchPlayer();
  }

  function handleInputChange(player, value) {
    setInputs(prev => ({ ...prev, [player]: value }));
  }

  async function handleSubmit(e, player) {
    e.preventDefault();
    if (player !== current) return; // only current player can submit

    const raw = inputs[player].trim().toLowerCase();
    if (!raw) return;

    if (raw.length < 4) return penalizeAndPass("Too short");
    if (history.some(h => h.word === raw)) return penalizeAndPass("Repeated");
    if (lastLetter && raw[0] !== lastLetter) return penalizeAndPass("Wrong starting letter");

    setIsChecking(true);
    pauseTimer();
    const result = await validateWord(raw);
    setIsChecking(false);

    if (!result.valid) return penalizeAndPass("Not valid English");

    // Success
    setScores(prev => ({ ...prev, [current]: prev[current] + 1 }));
    setHistory(prev => [...prev, { word: raw, by: current, meaning: result.meaning }]);
    setInputs(prev => ({ ...prev, [current]: "" }));
    switchPlayer();
  }

  function penalizeAndPass(reason) {
    console.log(reason);
    setScores(prev => ({ ...prev, [current]: prev[current] - 1 }));
    setInputs(prev => ({ ...prev, [current]: "" }));
    switchPlayer();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Shiritori Game</h1>
      <Scoreboard scores={scores} current={current} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Player A Card */}
        <div className={`p-4 rounded-xl shadow-md ${current === "A" ? "bg-green-100" : "bg-gray-100"}`}>
          <h2 className="text-xl font-semibold mb-2">Player A</h2>
          <form onSubmit={(e) => handleSubmit(e, "A")}>
            <input
              type="text"
              value={inputs.A}
              onChange={(e) => handleInputChange("A", e.target.value)}
              disabled={current !== "A" || isChecking}
              placeholder={current === "A" ? `Type a word${lastLetter ? ` starting with '${lastLetter}'` : ""}` : "Wait..."}
              className="border rounded p-2 w-full"
            />
            <button
              type="submit"
              disabled={current !== "A" || isChecking}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Player B Card */}
        <div className={`p-4 rounded-xl shadow-md ${current === "B" ? "bg-blue-100" : "bg-gray-100"}`}>
          <h2 className="text-xl font-semibold mb-2">Player B</h2>
          <form onSubmit={(e) => handleSubmit(e, "B")}>
            <input
              type="text"
              value={inputs.B}
              onChange={(e) => handleInputChange("B", e.target.value)}
              disabled={current !== "B" || isChecking}
              placeholder={current === "B" ? `Type a word${lastLetter ? ` starting with '${lastLetter}'` : ""}` : "Wait..."}
              className="border rounded p-2 w-full"
            />
            <button
              type="submit"
              disabled={current !== "B" || isChecking}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Timer */}
      <p className="mt-4 text-lg font-bold">⏳ Time Left: {timeLeft}s</p>

      {/* History */}
      <div className="mt-6 text-left">
        <h3 className="text-xl font-semibold mb-2">Word History</h3>
        <ul className="space-y-1">
          {history.map((h, i) => (
            <li key={i} className="border p-2 rounded">
              <span className="font-bold">{h.word}</span> ({h.by}) – <em>{h.meaning}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
