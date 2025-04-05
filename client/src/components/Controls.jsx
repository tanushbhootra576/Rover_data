import React from "react";

function Controls() {
    const moveRover = async (direction) => {
        try {
            const response = await fetch(`http://localhost:3000/move/${direction}`);
            const data = await response.json();
            console.log(`Moved ${direction}:`, data);
        } catch (error) {
            console.error(`Error moving ${direction}:`, error);
        }
    };

    return (
        <div className="controls-container">
            <h2>Rover Controls</h2>
            <div className="button-grid">
                <button onClick={() => moveRover("forward")}>⬆ Forward</button>
                <div className="spacer"></div>
                <button onClick={() => moveRover("left")}>⬅ Left</button>
                <button onClick={() => moveRover("stop")}>⏹ Stop</button>
                <button onClick={() => moveRover("right")}>➡ Right</button>
                <div className="spacer"></div>
                <button onClick={() => moveRover("backward")}>⬇ Backward</button>
            </div>
        </div>
    );
}

export default Controls;
