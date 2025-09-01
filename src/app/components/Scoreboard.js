export default function Scoreboard({ scores, current }) {
  return (
    <div className="flex justify-around mb-4 text-xl">
      <div className={current === "A" ? "font-bold text-green-600" : ""}>
        Player A: {scores.A}
      </div>
      <div className={current === "B" ? "font-bold text-green-600" : ""}>
        Player B: {scores.B}
      </div>
    </div>
  );
}
