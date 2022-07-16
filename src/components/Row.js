import movieTrailer from "movie-trailer";
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import "../components/Row.css";

const base_url_img = "https://image.tmdb.org/t/p/original";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    // if [] is blank, run once when the row loads, and dont run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    debugger;
    const movieName = movie?.name === undefined ? movie.title : movie.name
    if (trailerUrl) {
      setTrailerUrl('');

    }
    else {
      movieTrailer(movieName || "")
        .then(url => {

          debugger;
          const urlParameters = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParameters.get('v'));

        })
        .catch((error) => {
          console.log(error)

        }

        )
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url_img}${isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
