import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import MovieModal from "../MovieModal/MovieModal";
import { RowContainer, RowPosters, RowPoster, RowTitle } from "./Styled";

// Swiper
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

export default function Row({ isLarge, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    try {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  return (
    <>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
      <RowContainer>
        <RowTitle>{title}</RowTitle>
        <Swiper
          slidesPerView={title === "NETFLIX ORIGINALS" ? 13 : 6}
          spaceBetween={100}
          navigation={true}
          modules={[Navigation]}
          className="Swiper"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <RowPoster
                isLarge={isLarge ? "true" : "false"}
                src={`https://image.tmdb.org/t/p/original/${
                  isLarge ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </RowContainer>
    </>
  );
}
