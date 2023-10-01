import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
// import PicturePuzzleSelector from "./Pages/PicturePuzzle";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import { Container } from "@mui/material";
import PicturePuzzleScreen from "./Pages/PicturePuzzle/puzzle_screen";
import NavBar from "./navbar";
import PicturePuzzleSelector from "./Pages/PicturePuzzle";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
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
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/picture-puzzle"
            element={<PicturePuzzleSelector />}
          />
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
