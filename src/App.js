import { useEffect, useState } from "react";
import React from "react";
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";
const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`

const movie1 = {
  "Title": "Spiderman",
  "Year": "1990",
  "imdbID": "tt0100669",
  "Type": "movie",
  "Poster": "N/A"
}

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm]=useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }
  useEffect(() => {
    searchMovies('Spiderman')
  }, [])
  return (
    <div className="app">
      <h1>PopcornPilot</h1>
      <div className="search">
        <input placeholder='Search for Movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <img src={SearchIcon} alt="icon" onClick={() => searchMovies(searchTerm)} />
      </div>
      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies Found</h2>
            </div>
          )
      }

    </div>
  );
}

export default App;