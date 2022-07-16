import React, { useEffect, useState, useRef } from "react";
import axios from "../axios";
import requests from "../requests";
import "../components/Banner.css";

function Banner() {
  const index = useRef(0);
  const [movie, setMovie] = useState([]);
  const [movieDesc, setMovieDesc] = useState("");
  const [desc, setDesc] = useState([""]);
  const [descLength, setDescLength] = useState(-1);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     const req = await axios.get(requests.fetchNetflixOriginals);
  //     const movieResult =
  //       req.data.results[
  //         Math.floor(Math.random() * req.data.results.length - 1)
  //       ];
  //     setMovie(movieResult);

  //     return req;
  //   }

  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(requests.fetchNetflixOriginals)
        .then((req) => {
          const movieResult =
            req.data.results[
              Math.floor(Math.random() * req.data.results.length - 1)
            ];
          setMovie(movieResult);
          debugger;
          console.log(movie);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
    return movie;
  }, []);

  // typeWriter

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.title || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">{movie?.overview}</h1>
      </div>
      <div className="banner--fadebottom"></div>
    </header>
  );
}

export default Banner;
