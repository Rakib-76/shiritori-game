export default function TurnPanel({ input, setInput, onSubmit, timeLeft, lastLetter, isChecking }) {
  return (
    <form onSubmit={onSubmit} className="mb-4">
      <p className="mb-2">Time Left: {timeLeft}s</p>
      {lastLetter && <p className="mb-2">Word must start with: <strong>{lastLetter}</strong></p>}
      <input
        className="border p-2 w-2/3"
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={isChecking}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 ml-2"
        disabled={isChecking}
      >
        {isChecking ? "Checking..." : "Submit"}
      </button>
    </form>
  );
}
