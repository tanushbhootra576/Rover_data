import axios from "axios";

const BASE_URL = "http://localhost:3000";

const RoverControls = ({ onStatusUpdate }) => {
  const moveRover = async (direction) => {
    try {
      console.log(`📡 Sending Move Request: ${direction}`);
      const response = await axios.get(`${BASE_URL}/move/${direction}`);
      console.log("✅ Move Response:", response.data);
      onStatusUpdate(); // Refresh status after movement
    } catch (error) {
      console.error(`❌ Failed to move ${direction}:`, error.message);
    }
  };

  return (
    <div style={styles.joystickContainer}>
      <button style={styles.button} onClick={() => moveRover("forward")}>▲</button>
      <div style={styles.middleRow}>
        <button style={styles.button} onClick={() => moveRover("left")}>◄</button>
        <button style={{ ...styles.button, visibility: "hidden" }}> </button> {/* Placeholder for spacing */}
        <button style={styles.button} onClick={() => moveRover("right")}>►</button>
      </div>
      <button style={styles.button} onClick={() => moveRover("backward")}>▼</button>
    </div>
  );
};

const styles = {
  joystickContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px", // Reduced gap for a tighter layout
  },
  middleRow: {
    display: "flex",
    justifyContent: "center",
    gap: "5px", // Reduced gap for a tighter layout
  },
  button: {
    width: "50px", // Reduced size for compactness
    height: "50px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "#333",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.1s ease",
  },
};

export default RoverControls;
