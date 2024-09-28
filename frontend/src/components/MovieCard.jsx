import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import "../App.css";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { updateMovie, deleteMovie } from "../api";

const MovieCard = ({ movie, fetchMovies }) => {
  const [updatedMovie, setUpdatedMovie] = useState(movie);
  const textColor = useColorModeValue("#333333", "#EAEAEA");
  const bg = useColorModeValue("#D2E4E8", "#2C2C2C");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      setUpdatedMovie(movie);
    }
  }, [isOpen, movie]);

  const handleDeleteMovie = async (id) => {
    try {
      const response = await deleteMovie(id);
      fetchMovies();
      toast({
        title: "Success",
        description: response.data.message || "Movie deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Error deleting movie";
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateMovie = async (id) => {
    try {
      await updateMovie(id, updatedMovie);
      onClose();
      fetchMovies();
      toast({
        title: "Success",
        description: "Movie updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Error updating movie";
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)" }}
      bg={bg}
      className="border"
    >
      <Image
        src={movie.image}
        alt={movie.title}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {movie.title}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={2}>
          Genre: {movie.genre}
        </Text>
        <Text color={textColor} marginY={"10px"}>
          Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteMovie(movie._id)}
            colorScheme="pink"
            backgroundColor="#F81D55"
            color="white"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Movie Title"
                name="title"
                value={updatedMovie.title}
                onChange={(e) =>
                  setUpdatedMovie({ ...updatedMovie, title: e.target.value })
                }
              />
              <Input
                placeholder="Genre"
                name="genre"
                value={updatedMovie.genre}
                onChange={(e) =>
                  setUpdatedMovie({ ...updatedMovie, genre: e.target.value })
                }
              />
              <Input
                placeholder="Release Date"
                name="releaseDate"
                type="date"
                value={updatedMovie.releaseDate.split("T")[0]} // Assuming releaseDate is in ISO format
                onChange={(e) =>
                  setUpdatedMovie({
                    ...updatedMovie,
                    releaseDate: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedMovie.image}
                onChange={(e) =>
                  setUpdatedMovie({ ...updatedMovie, image: e.target.value })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateMovie(movie._id)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieCard;
