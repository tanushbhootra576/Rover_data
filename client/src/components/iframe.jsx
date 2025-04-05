import React from 'react'
import './iframe.css'
const iframe = () => {
  return (
    <div>
     <iframe
  src="https://webots.cloud/run?url=https://raw.githubusercontent.com/QuantX324/hack-rover/main/final_demo.wbt"
  width="100%"
  height="600px"
  style={{ border: "none", background: "none" }}
  title="Webots Cloud Simulation"
></iframe>

    </div>
  )
}

export default iframe
