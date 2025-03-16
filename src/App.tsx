import { useEffect, useState } from "react";
import moment from "moment-timezone";

function App() {
  const [timezoneOptions, setTimeZoneOptions] = useState<{value: string, label: string}[]>([]);

  useEffect(() => {
    const options = moment.tz.names().map((tz) => ({
      value: tz,
      label: `${tz} (${moment.tz(tz).format("z")})`,
    }));
    setTimeZoneOptions(options);
  }, []);

  const [sourceTimezone, setSourceTimezone] = useState<string>('');
  const [additionalTimezones, setAdditionalTimezones] = useState<string[]>([]);

  const updateAdditionalTimezone = (index: number, value: string) => {
    const updatedTimezones = [...additionalTimezones];
    updatedTimezones[index] = value;
    setAdditionalTimezones(updatedTimezones);
  };

  const removeTimezone = (index: number) => {
    const updatedTimezones = additionalTimezones.filter((_, i) => i !== index);
    setAdditionalTimezones(updatedTimezones);
  };

  const addTimezone = () => {
    setAdditionalTimezones([...additionalTimezones, ""]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Timezone Converter</h1>

      {/* Source Timezone */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Source Timezone:
        </label>
        <select
          value={sourceTimezone}
          onChange={(e) => setSourceTimezone(e.target.value)}
          style={{ padding: "8px", width: "100%" }}
        >
          <option value="">-- Select Source Timezone --</option>
          {timezoneOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Additional Timezones */}
      <div>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Additional Timezones:
        </label>
        {additionalTimezones.map((timezone, index) => (
          <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
            <select
              value={timezone}
              onChange={(e) => updateAdditionalTimezone(index, e.target.value)}
              style={{ padding: "8px", flex: 1 }}
            >
              <option value="">-- Select Timezone --</option>
              {timezoneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => removeTimezone(index)}
              style={{
                marginLeft: "10px",
                padding: "8px",
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addTimezone}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Timezone
        </button>
      </div>
    </div>
  );
}

export default App;