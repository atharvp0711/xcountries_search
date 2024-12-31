import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";

const Countries = () => {
  const API_URL =
    "https://0b9f457a-c7f4-4a28-9f68-2fe10314cedd.mock.pstmn.io/crio";

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); // State to track API errors
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load country data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      {/* Display loading state */}
      {loading && <p style={{ textAlign: "center" }}>Loading countries...</p>}

      {/* Display error message if API fails */}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "20px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {!loading && !error && filteredCountries.length > 0
          ? filteredCountries.map((country, index) => (
              <CountryCard
                name={country.common}
                flagImg={country.png}
                key={index}
              />
            ))
          : !loading &&
            !error && (
              <p
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                }}
              >
                No countries found
              </p>
            )}
      </div>
    </div>
  );
};

export default Countries;
