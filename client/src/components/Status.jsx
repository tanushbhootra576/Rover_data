import React, { useEffect, useState } from "react";

function Status() {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 5000); // Auto-refresh every 5 sec
        return () => clearInterval(interval);
    }, []);

    const fetchStatus = async () => {
        try {
            const response = await fetch("http://localhost:3000/status");
            const data = await response.json();
            setStatus(data);
        } catch (error) {
            console.error("Error fetching rover status:", error);
        }
    };

    return (
        <div className="status-container">
            <h2>Rover Status</h2>
            {status ? (
                <div>
                    <p><strong>Battery:</strong> {status.battery}%</p>
                    <p><strong>Status:</strong> {status.status}</p>
                    <p><strong>Location:</strong> {JSON.stringify(status.location)}</p>
                    <p><strong>Sensor Data:</strong> {JSON.stringify(status.sensor_data)}</p>
                    {status.rechargeMessage && <p style={{ color: "orange" }}><strong>Recharge:</strong> {status.rechargeMessage}</p>}
                    {status.communicationMessage && <p style={{ color: "red" }}><strong>Communication Issue:</strong> {status.communicationMessage}</p>}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Status;
