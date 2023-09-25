import React, { useState } from "react";
import PropTypes from "prop-types";

// import uuid from "react-native-uuid";

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

const PicturePuzzleSelector = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const cropImage = async (source, imageWidth, imageHeight) => {
  //   try {
  //     const allCroppedImages = [];
  //     const imageUri = Asset.fromModule(source).uri;
  //     const parts = 16;
  //     const cropWidth = Math.floor(imageWidth / Math.sqrt(parts));
  //     const cropHeight = Math.floor(imageHeight / Math.sqrt(parts));

  //     for (let i = 0; i < parts; i++) {
  //       const cropData = {
  //         width: cropWidth,
  //         height: cropHeight,
  //         originX: (i % Math.sqrt(parts)) * cropWidth,
  //         originY: Math.floor(i / Math.sqrt(parts)) * cropHeight,
  //       };

  //       const croppedImage = await manipulateAsync(
  //         imageUri,
  //         [{ crop: cropData }],
  //         {
  //           compress: 1,
  //           format: SaveFormat.JPEG,
  //         }
  //       );

  //       allCroppedImages.push(croppedImage);
  //     }

  //     return { original: source, images: allCroppedImages };
  //   } catch (e) {
  //     return { status: "Error ", content: e };
  //   }
  // };

  const handleImageSelection = (item) => {
    // setLoading(true);
    // const puzzleImage = await cropImage(item.source, item.height, item.width);
    // setLoading(false);
    navigate("picturePuzzleScreen", { state: { img: item } });
  };

  if (loading) {
    return (
      <Box flex={1} p={2}>
        <Stack space={8} justifyContent="center" alignItems="center" flex={1}>
          {/* <Spinner size="lg" /> */}
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
            onClick={() => handleImageSelection(item.img)}
          >
            {/* {splitImage(item.img).map((slice, index) => (
              <img key={index} src={slice} alt={`Slice ${index}`} />
            ))} */}
            <img src={item.img} alt="Puzzle-Item" />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>{item.name}</span>}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* {PuzzleImages.length > 0 &&
        Array.from({ length: Math.ceil(PuzzleImages.length / 3) }, (_, i) => (
          <Stack alignItems="center" space={2}>
            {PuzzleImages.slice(i * 3, (i + 1) * 3).map((item) => {
              return (
                <Stack key={uuid.v1()} space={4} style={{ paddingBottom: 8 }}>
                  <Box
                    onPress={() => {
                      handleImageSelection(item);
                    }}
                  >
                    <Image
                      source={item.source}
                      alt={"original"}
                      resizeMode="cover"
                      borderRadius={10}
                      style={{
                        height: pictureSize,
                        width: pictureSize,
                        borderWidth: 1,
                        borderColor: "orange",
                      }}
                    />
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        ))} */}
    </Box>
  );
};

PicturePuzzleSelector.propTypes = {
  navigation: PropTypes.object.isRequired,
};

PicturePuzzleSelector.defaultProps = {};

export default PicturePuzzleSelector;
