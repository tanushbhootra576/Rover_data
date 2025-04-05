import { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from "@react-spring/web";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const BASE_URL = "http://localhost:3000";

const RoverStatus = () => {
  const [status, setStatus] = useState({ battery: 0, location: "Loading...", sensor_data: "Loading..." });
  const [batteryHistory, setBatteryHistory] = useState([]);
  const [timeStamps, setTimeStamps] = useState([]);
  const [showGraph, setShowGraph] = useState(false); // Toggle for popup

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/status`);
      const batteryLevel = response.data.status.battery;

      setStatus(response.data.status);

      // Update battery history (keep last 10 data points)
      setBatteryHistory((prev) => [...prev.slice(-9), batteryLevel]);
      setTimeStamps((prev) => [...prev.slice(-9), new Date().toLocaleTimeString()]);
    } catch (error) {
      console.error("❌ Failed to fetch status:", error.message);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000); // Fetch every 3 sec
    return () => clearInterval(interval);
  }, []);

  // Battery Bar Animation
  const batteryAnimation = useSpring({ width: `${status.battery}%`, from: { width: "0%" } });

  // Chart Data
  const data = {
    labels: timeStamps,
    datasets: [
      {
        label: "Battery %",
        data: batteryHistory,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    scales: {
      y: { min: 0, max: 100 },
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🔋 Rover Status</h2>

      {/* Battery Bar */}
      <div style={styles.batteryContainer}>
        <animated.div style={{ ...styles.batteryFill, ...batteryAnimation }} />
      </div>
      <p style={styles.batteryText}><strong>Battery:</strong> {status.battery}%</p>
<br />
      {/* Location and Sensor Data */}
      <p><strong>Location:</strong> {JSON.stringify(status.location)}</p>
      <p><strong>Sensor Data:</strong> {JSON.stringify(status.sensor_data)}</p>

      {/* Button to Show Graph */}
      <button style={styles.graphButton} onClick={() => setShowGraph(true)}>📊 View Battery Graph</button>

      {/* Graph Popup Modal */}
      {showGraph && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.chartTitle}>Battery % Over Time</h3>
            <Line data={data} options={options} />
            <button style={styles.closeButton} onClick={() => setShowGraph(false)}>❌ Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    background: "black",
    color: "#fff",
    borderRadius: "10px",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
    width: "40vw",
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "20px",
  },
  batteryContainer: {
    width: "100%",
    height: "20px",
    background: "#444",
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
  },
  batteryFill: {
    height: "100%",
    background: "linear-gradient(-90deg, #00ff00, #ffcc00, #ff0000)",
    transition: "width 0.5s ease-in-out",
  },
  batteryText: {
    textAlign: "center",
    marginTop: "5px",
    fontSize: "16px",
  },
  graphButton: {
    marginTop: "15px",
    padding: "12px 20px",
    background: "linear-gradient(to right, #4CAF50, #00c853)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
  },
  graphButtonHover: {
    transform: "scale(1.05)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#333",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.3)",
    maxWidth: "600px",
    width: "90%",
    textAlign: "center",
  },
  chartTitle: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#fff",
  },
  closeButton: {
    marginTop: "15px",
    padding: "10px 15px",
    background: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
};

export default RoverStatus;
