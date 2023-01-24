import React, { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (countriesToShow.length > 10) {
    return (
      <div>
        <div>
          find countries <input value={filter} onChange={handleFilterChange} />
        </div>
        <div>Too many matches, specify another filter</div>
      </div>
    );
  }

  if (countriesToShow.length > 1) {
    return (
      <div>
        <div>
          find countries <input value={filter} onChange={handleFilterChange} />
        </div>
        <ul>
          {countriesToShow.map((country) => (
            <div key={country.name}>
              <li>{country.name}</li>
              <button onClick={() => setFilter(country.name)}>show</button>
            </div>
          ))}
        </ul>
      </div>
    );
  }

  if (countriesToShow.length === 1) {
    return (
      <div>
        <div>
          find countries <input value={filter} onChange={handleFilterChange} />
        </div>
        <h1>{countriesToShow[0].name}</h1>
        <div>Capital: {countriesToShow[0].capital}</div>
        <div>Population: {countriesToShow[0].population}</div>
        <h2>Languages: </h2>
        <ul>
          {countriesToShow[0].languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={countriesToShow[0].flag} alt="flag" width="100" />
      </div>
    );
  }

  if (countriesToShow.length === 0) {
    return (
      <div>
        <div>
          find countries <input value={filter} onChange={handleFilterChange} />
        </div>
        <div>No matches</div>
      </div>
    );
  }
}

export default App;
