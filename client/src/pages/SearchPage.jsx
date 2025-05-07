import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (query.length === 0) {
      setPlaces([]);
      return;
    }

    const fetchPlaces = async () => {
      try {
        const res = await axios.get(
          `/api/places?q=${query}`
        );
        setPlaces(res.data);
      } catch (error) {
        console.error("Error fetching places", error);
      }
    };

    fetchPlaces();
  }, [query]);

  return (
    <main className="wrapper flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1>Пошук закладів</h1>
        <Link to="/" className="btn">Назад</Link>
      </div>
      <input
        type="text"
        placeholder="Введіть назву або адресу..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "300px", padding: "10px", fontSize: "16px" }}
      />

      <ul className="flex flex-col gap-5">
        {places.map((place) => (
          <li key={place._id} className="flex flex-col g-1">
            <h5>
              <strong>{place.name}</strong>
            </h5>
            <p>{place.address}</p>
            <p>{place.email}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default SearchPage;
