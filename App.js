import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`
    );
    const data = await res.json();
    setResults(data.query.search);
  };

  return (
    <div className="app">
      <h1>📚 Wikipedia Clone</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Wikipedia..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul className="results">
        {results.map((item) => (
          <li key={item.pageid}>
            <a
              href={`https://en.wikipedia.org/?curid=${item.pageid}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{item.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: item.snippet }} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
