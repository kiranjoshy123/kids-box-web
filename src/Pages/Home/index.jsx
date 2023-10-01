import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import dora from "../../assets/picture-puzzle/dora.jpg";
import mermaid from "../../assets/picture-puzzle/mermaid.jpg";
import frozen from "../../assets/picture-puzzle/frozen.jpg";
import minions from "../../assets/picture-puzzle/minions.jpg";
import ratatouille from "../../assets/picture-puzzle/ratatouille.jpg";
import zootopia from "../../assets/picture-puzzle/zootopia.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box paddingTop={2}>
      <Grid container>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea
            onClick={() => {
              navigate("picture-puzzle");
            }}
          >
            <CardMedia
              component="div"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "6px",
              }}
            >
              <img
                src={dora}
                alt="Image 1"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <img
                src={mermaid}
                alt="Image 2"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <img
                src={frozen}
                alt="Image 3"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <img
                src={ratatouille}
                alt="Image 3"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <img
                src={minions}
                alt="Image 3"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <img
                src={zootopia}
                alt="Image 3"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Picture Puzzle
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Box>
  );
};

export default Home;
