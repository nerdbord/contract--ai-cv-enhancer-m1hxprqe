import { useState } from "react";

export default function Adjust() {
  const [jobUrl, setJobUrl] = useState("");
  const [adjustedCV, setAdjustedCV] = useState(null);

  const handleAdjust = () => {
    // Call AI adjustment logic here
    setAdjustedCV("Adjusted CV content based on job offer");
  };

  return (
    <div>
      <h1>Adjust your CV to a Job Offer</h1>
      <input
        type="text"
        value={jobUrl}
        onChange={(e) => setJobUrl(e.target.value)}
        placeholder="Enter job offer URL"
      />
      <button onClick={handleAdjust}>Adjust</button>
      {adjustedCV && <div>{adjustedCV}</div>}
    </div>
  );
}