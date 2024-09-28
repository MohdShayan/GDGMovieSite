import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Input,
  Button,
  HStack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../api";
import MovieCard from "../components/MovieCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const fetchMovies = async (filterOptions = {}) => {
    try {
      const response = await getMovies(filterOptions);
      
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = async () => {
    const filterOptions = {
      genre,
      year,
    };
    fetchMovies(filterOptions);
  };

  const handleReset = () => {
    setGenre("");
    setYear("");
    fetchMovies();
  };

  const bg = useColorModeValue("#ABECFF", "gray.600");
  const inpbg = useColorModeValue("#D2E4E8", "#2C2C2C");
  const txtbg = useColorModeValue("black", "white");
  const hoverBgLight = "#87E0E0"; 
  const hoverBgDark = "gray.700"; 
  const textGradient = useColorModeValue(
    "linear(115deg, #004ff9, #15484a)", // Light
    "linear(115deg, #f9ce34, #ee2a7b, #6228d7)" // Dark
  );
  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8}>
        <Text
          fontSize={"31"}
          fontWeight={"bold"}
          bgClip={"text"}
          textAlign={"center"}
          bgGradient={textGradient}
        >
          Current Movies 🎥
        </Text>

        <HStack spacing={4} mb={8}>
          <Input
            placeholder="Filter by genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            bg={inpbg}
            color={txtbg}
          />
          <Input
            placeholder="Filter by year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            bg={inpbg}
            color={txtbg}
          />
          <Button bg={bg} onClick={handleSearch} px={8} m={2} _hover={{ bg: useColorModeValue(hoverBgLight, hoverBgDark) }}>
            Search
          </Button>
          <Button bg={bg} onClick={handleReset} px={8} m={2} _hover={{ bg: useColorModeValue(hoverBgLight, hoverBgDark) }}>
            Reset
          </Button>
        </HStack>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                fetchMovies={fetchMovies}
              />
            ))
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              textAlign={"center"}
              width="full"
              my={10}
            >
              <Text fontSize="xl" fontWeight="bold" color="gray.500" textAlign={"center"}>
                No movies found ☹️{" "}
                <Link to={"/create"}>
                  <Text
                    as="span"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Add a Movie 🎞️
                  </Text>
                </Link>
              </Text>
            </Box>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
