import { Route, Routes } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("#EAFCFC", "#1A1A1A")}>
    
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
