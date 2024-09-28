import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#ABECFF", "gray.500");
  const hoverBgLight = "#87E0E0"; 
  const hoverBgDark = "gray.700";
  const textGradient = useColorModeValue(
    "linear(to-r,  #004ff9, #1904e5)", // Light
    "linear(to-r, #62daca, #10d4a9)" // Dark
  );

  return (
    <Container maxW={"100vw"} px={20}>
      <Flex
        h={20}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
        color="white"
        p={4}
      >
        <Text
          bgGradient={textGradient}
          bgClip="text"
          fontSize={{ base: "30", sm: "35" }}
          fontWeight="bold"
          textAlign={"center"}
        >
          <Link to={"/"}>Moovieos 🎬 </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button
              aria-label="Add new item"
              bg={bg}
              _hover={{ bg: useColorModeValue(hoverBgLight, hoverBgDark) }}
            >
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button
            aria-label="Toggle Theme"
            onClick={toggleColorMode}
            bg={bg}
            _hover={{ bg: useColorModeValue(hoverBgLight, hoverBgDark) }}
          >
            {colorMode === "light" ? <IoMoon size={20} /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
