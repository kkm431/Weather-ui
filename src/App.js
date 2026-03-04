import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/weather/current?city=${city}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);

    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>🌤 Weather Dashboard</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

const WeatherCard = ({ data }) => {
  const { location, current } = data;

  return (
    <div style={styles.card}>
      <h2>{location.name}, {location.region}</h2>
      <p>{location.country}</p>

      <img
        src={`https:${current.condition.icon}`}
        alt="weather icon"
      />

      <h1>{current.temp_c}°C</h1>
      <p>{current.condition.text}</p>

      <div style={styles.info}>
        <p>Feels Like: {current.feelslike_c}°C</p>
        <p>Humidity: {current.humidity}%</p>
        <p>Wind: {current.wind_kph} kph ({current.wind_dir})</p>
        <p>Pressure: {current.pressure_mb} mb</p>
        <p>Visibility: {current.vis_km} km</p>
        <p>Last Updated: {current.last_updated}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial"
  },
  searchBox: {
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    width: "250px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 15px",
    marginLeft: "10px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  card: {
    width: "400px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  },
  info: {
    marginTop: "15px",
    textAlign: "left"
  }
};

export default App;