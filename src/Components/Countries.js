import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";

const Countries = () => {
  const API_URL =
    "https://0b9f457a-c7f4-4a28-9f68-2fe10314cedd.mock.pstmn.io/crio";
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data:" + error));
  }, []);

  const filteredCountries = countries.filter((country) => {
    const countryName = country.name?.toLowerCase().trim(); // Safeguard against undefined or extra spaces
    const search = searchTerm.toLowerCase().trim();
    return countryName.includes(search); // Strict substring matching
  });

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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "20px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard
              name={country.name}
              flagURL={country.flag}
              key={country.abbr}
            />
          ))
        ) : (
          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
            }}
          >
            {" "}
            No countries found
          </p>
        )}
      </div>
    </div>
  );
};

export default Countries;
