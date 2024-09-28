import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { createMovie } from "../api";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    rating: "",
    releaseDate: "",
    image: "",
  });

  const navigate = useNavigate(); 

  const handleAddMovie = async () => {
    if (
      !movieData.title ||
      !movieData.genre ||
      !movieData.rating ||
      !movieData.releaseDate ||
      !movieData.image
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      await createMovie(movieData);

      
      navigate("/"); 

      setMovieData({
        title: "",
        genre: "",
        rating: "",
        releaseDate: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Add a Movie 🎞️
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Movie Title"
              name="title"
              type="text"
              value={movieData.title}
              onChange={handleChange}
            />
            <Input
              placeholder="Genre"
              name="genre"
              type="text"
              value={movieData.genre}
              onChange={handleChange}
            />
            <Input
              placeholder="Rating (0 - 10)"
              name="rating"
              type="number"
              value={movieData.rating}
              onChange={handleChange}
            />
            <Input
              placeholder="Release Date"
              name="releaseDate"
              type="date"
              value={movieData.releaseDate}
              onChange={handleChange}
            />
            <Input
              placeholder="Image URL"
              name="image"
              type="text"
              value={movieData.image}
              onChange={handleChange}
            />

            <Button colorScheme="blue" w="full" onClick={handleAddMovie}>
              Add Movie
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
