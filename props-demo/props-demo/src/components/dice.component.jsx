function DiceRoll({ callback }) {
  return (
    <button
      className="dice-btn"
      onClick={() => callback(Math.floor(Math.random() * 6) + 1)}
      style={{
        backgroundColor: "#7209b7",
        color: "#ffff",
        border: "none",
        outline: "none",
        fontSize: "20px",
      }}
    >
      Roll Dice
    </button>
  );
}

export default DiceRoll;
