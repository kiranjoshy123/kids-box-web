import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
// import PicturePuzzleSelector from "./Pages/PicturePuzzle";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import PicturePuzzleScreen from "./Pages/PicturePuzzle/puzzle_screen";
import NavBar from "./navbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" onClick={() => navigate("/")}>
            K!Ds BoX
          </Typography>
        </Toolbar>
      </AppBar> */}
      <NavBar></NavBar>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/picturePuzzleScreen"
            element={<PicturePuzzleScreen />}
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
