import { useEffect } from "react";
import CountryCard from "./CountryCard";
// import { useEffect } from "react";
import { useState } from "react";

const Countries = () => {
    const API_URL = "https://xcountries-backend.azurewebsites.net/all";
    const [countries , setCountries] = useState([]) ;
    // console.log(countries);
    useEffect(() => {
        fetch(API_URL)
        .then((res) => res.json())
        .then((data) => setCountries(data))
        .catch((error) => console.error("Error fetching data:" + error))
    } , []) 
    return (
        <div
        style={
            {
                display: "flex",
                flexWrap : "wrap" ,
                gap: "10px"  ,              
            }
        }>
            {/* <h1> Countries </h1>  */}
            {countries.map((country) => (
                <CountryCard name = {country.name} flagURL = {country.flag} key = {country.abbr} />
            ))}
        </div>
    );
};

export default Countries ; 