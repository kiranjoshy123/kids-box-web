import React, { useState } from "react";
import PropTypes from "prop-types";
import PuzzleImages from "./Database";

import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PicturePuzzleSelector = () => {
  const [loading] = useState(false);
  const navigate = useNavigate();
  const handleImageSelection = (item) => {
    navigate("picturePuzzleScreen", { state: { img: item } });
  };

  if (loading) {
    return (
      <Box flex={1} p={2}>
        <Stack space={8} justifyContent="center" alignItems="center" flex={1}>
          <Typography color="primary.500" fontSize="md">
            Loading.
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box flex={1} p={2}>
      <Stack size={10}>
        <Typography variant="h6">Choose the image for your puzzle</Typography>
      </Stack>
      <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
        {PuzzleImages.map((item) => (
          <ImageListItem
            key={item.img}
            style={{ cursor: "pointer" }}
            onClick={() => handleImageSelection(item.img)}
          >
            <img src={item.img} alt="Puzzle-Item" />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>{item.name}</span>}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

PicturePuzzleSelector.propTypes = {
  navigation: PropTypes.object.isRequired,
};

PicturePuzzleSelector.defaultProps = {};

export default PicturePuzzleSelector;
