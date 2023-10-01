import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Grid container>
        <Card
          sx={{ minWidth: 275 }}
          onClick={() => {
            navigate("picture-puzzle");
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Picture Puzzle
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default Home;
