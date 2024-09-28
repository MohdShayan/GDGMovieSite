import axios from 'axios';


const API_URL = 'http://localhost:3001/api/movies';

export const getMovies = async (filterOptions) => {
  const {genre,year}= filterOptions;
  return axios.get(API_URL,{
    params: {
      genre,
      year,
    },
  });
};

export const createMovie = async (movieData) => {
  return axios.post(API_URL, movieData);
};

export const updateMovie = async (id, movieData) => {
  return axios.put(`${API_URL}/${id}`, movieData);
};

export const deleteMovie = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getMovieById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};
