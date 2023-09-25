import React, { useCallback, useEffect, useMemo, useState } from "react";
// // import { getSuccessGifs } from "../../components/gifs";
import { randomNumber, shuffle } from "../../utilities/generate";
// // import _ from "lodash";
// // import Status from "../../constants/status";
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./picture_puzzle.css";
import { Rnd } from "react-rnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";

// const PicturePuzzleScreen = ({ route }) => {
//   const { state } = useLocation();
//   console.log(state);

//   // const size = Math.floor(Dimensions.get("window").width);
//   const originalPieces = useMemo(
//     () =>
//       Array.apply(null, Array(16)).map((x, i) => {
//         return { key: i };
//       }),
//     []
//   );
//   // const shuffledPieces = useMemo(() => {
//   //   const p = [...originalPieces];
//   //   shuffle(p);
//   //   return p;
//   // }, [originalPieces]);
//   // const [pieces, setPieces] = useState(shuffledPieces);
//   const [showHelp, setShowHelp] = useState(false);
//   // const [status, setStatus] = useState(Status.InProgress);
//   // const [successGifs] = useState(getSuccessGifs());

//   // const piecesPerRow = useMemo(() => Math.sqrt(pieces.length), [pieces.length]);

//   const [slices, setSlices] = useState([]);
//   const splitImage = async (image) => {
//     if (!image) return;

//     // Create an image element to load the image
//     // const fr = new FileReader();
//     // fr.readAsArrayBuffer(image);
//     // fr.onload = function () {
//     //   console.log("Image loaded.");
//     //   // you can keep blob or save blob to another position
//     //   const blob = new Blob([fr.result]);

//     //   // url for download
//     //   const url = URL.createObjectURL(blob, { type: "image/png" });
//     //   console.log(url);
//     // };

//     const imageData = fetch(image)
//       .then((res) => res.blob())
//       .then((blob) => {
//         console.log("Blob ", blob);
//         const imageUrl = URL.createObjectURL(blob);
//         const img = new Image();
//         img.src = imageUrl;
//         console.log(img.src);
//         img.onload = () => {
//           console.log("Loaded");
//           const { width, height } = img;
//           const sliceWidth = width / 3;
//           const sliceHeight = height / 3;
//           const canvas = document.createElement("canvas");
//           const context = canvas.getContext("2d");

//           const slicedImages = [];

//           for (let i = 0; i < 3; i++) {
//             for (let j = 0; j < 3; j++) {
//               canvas.width = sliceWidth;
//               canvas.height = sliceHeight;

//               context.drawImage(
//                 img,
//                 j * sliceWidth,
//                 i * sliceHeight,
//                 sliceWidth,
//                 sliceHeight,
//                 0,
//                 0,
//                 sliceWidth,
//                 sliceHeight
//               );

//               // Convert the canvas content to a data URL
//               const dataURL = canvas.toDataURL("image/jpeg");
//               slicedImages.push(dataURL);
//             }
//           }

//           setSlices(slicedImages);
//         };
//       });
//     // console.log(imageData);
//     // const imageBlob = new Blob([imageData], { type: "image/jpeg" });
//     // img.src = URL.createObjectURL(imageBlob);
//   };

//   console.log(slices);
//   useEffect(() => {
//     const puzzleImage = "../../assets/picture-puzzle/dora.jpg"; // state?.img;
//     splitImage(puzzleImage);
//   }, []);

//   // const pieceSize = useMemo(() => {
//   //   const baseSize = size / piecesPerRow;
//   //   return baseSize - (baseSize % PixelRatio.get()) - 5;
//   // }, [size, piecesPerRow]);

//   // const solve = useCallback(() => {
//   //   setPieces(originalPieces);
//   //   setShowHelp(false);
//   //   setStatus(Status.Success);
//   // }, [setPieces, originalPieces]);

//   // const retry = useCallback(() => {
//   //   setPieces(shuffledPieces);
//   //   setShowHelp(false);
//   //   setStatus(Status.InProgress);
//   // }, [setPieces, shuffledPieces]);

//   // useEffect(() => {
//   //   if (_.isEqual(pieces, originalPieces)) setStatus(Status.Success);
//   // }, [pieces]);

//   return <Box></Box>;
//   // return (
//   //   <Box flex={1}>
//   //     <Grid>
//   //       {/* <Row size={5}>
//   //         {status === Status.Success && <Heading>Wow!! Great Job!!</Heading>}
//   //       </Row> */}
//   //       <Grid item size={30} style={styles.center}>
//   //         {status === Status.InProgress && (
//   //           <img
//   //             source={puzzleImage.original}
//   //             // blurRadius={8}
//   //             resizeMode="contain"
//   //             style={{
//   //               height: 100,
//   //               width: 100,
//   //             }}
//   //           />
//   //         )}
//   //         {status === Status.Success &&
//   //           successGifs[randomNumber(0, successGifs.length)]}
//   //       </Grid>
//   //       <Grid item size={65}>
//   //         <Box
//   //           style={{
//   //             width: "100%",
//   //             height: "100%",
//   //           }}
//   //         >
//   //           <div // DraggableGrid
//   //             numColumns={4}
//   //             renderItem={(item) => {
//   //               return (
//   //                 <img
//   //                   source={puzzleImage.images[item.key]}
//   //                   style={{
//   //                     height: 100,
//   //                     width: 100,
//   //                     top: 0,
//   //                     left: 0,
//   //                   }}
//   //                 >
//   //                   {showHelp && <Typography>{item.key + 1}</Typography>}
//   //                 </img>
//   //               );
//   //             }}
//   //             data={pieces}
//   //             onDragRelease={(data) => {
//   //               setPieces(data); // need reset the props data sort after drag release
//   //             }}
//   //           />
//   //         </Box>
//   //       </Grid>
//   //       <Grid size={5}>
//   //         <Grid item style={{ paddingRight: 16 }}>
//   //           <Button onPress={() => setShowHelp(!showHelp)}>
//   //             {showHelp ? "No Help" : "Show Help"}{" "}
//   //           </Button>
//   //         </Grid>
//   //         <Grid item style={{ paddingRight: 16 }}>
//   //           {/* <Button size="sm" onPress={retry}>
//   //             Retry
//   //           </Button> */}
//   //         </Grid>
//   //         <Grid item>
//   //           {/* <Button size="sm" colorScheme="secondary" > // onPress={solve}
//   //             Solve
//   //           </Button> */}
//   //         </Grid>
//   //       </Grid>
//   //     </Grid>
//   //   </Box>
//   // );
// };

// export default PicturePuzzleScreen;

const DraggableImage = ({ piece, showHelp, onDrop }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "IMAGE",
    item: { id: piece.id, index: piece.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: "IMAGE",
    drop: (item) => {
      console.log(item);
      if (item.id !== piece.id) {
        onDrop(item.id, piece.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  const border = isOver ? "2px solid red" : "";

  return (
    <div
      ref={(node) => {
        dragRef(dropRef(node));
      }}
      style={{ ...piece.style, opacity, border }}
      className="image-part"
    >
      {showHelp && (
        <Avatar sx={{ width: 24, height: 24, fontSize: 14, color: "white" }}>
          {piece.index + 1}
        </Avatar>
      )}
    </div>
  );
};

const PicturePuzzleScreen = () => {
  const { state } = useLocation();
  const [showHelp, setShowHelp] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [noOfMoves, setNoOfMoves] = useState(0);
  const [pieces, setPieces] = useState([]);
  const [shuffledPieces, setShuffledPieces] = useState([]);
  const [originalPieces, setOriginalPieces] = useState([]);

  useEffect(() => {
    const image = new Image();
    image.src = state?.img;
    image.onload = () => {
      // Calculate the container size to maintain the image's aspect ratio
      const aspectRatio = image.width / image.height;
      const containerWidth = Math.sqrt((aspectRatio * 16 * 512 * 512) / 16);
      const containerHeight = (containerWidth * 512) / 512;

      setContainerSize({ width: containerWidth, height: containerHeight });
    };
  }, [state?.img]);

  useEffect(() => {
    const items = Array.from({ length: 16 }, (_, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      const backgroundPositionX = (col * 100) / 3;
      const backgroundPositionY = (row * 100) / 3;

      return {
        index: index,
        id: uuidv4(),
        style: {
          backgroundSize: `${containerSize.width}px ${containerSize.height}px`,
          backgroundRepeat: "no-repeat",
          width: `${containerSize.width / 4}px`,
          height: `${containerSize.height / 4}px`,
          backgroundImage: `url(${state?.img})`,
          backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
        },
      };
    });

    setOriginalPieces(items);
    const shuffedItems = shuffle([...items]);
    setShuffledPieces(shuffedItems);
    setPieces([...shuffedItems]);
  }, [containerSize]);

  const onSolve = useCallback(() => {
    setPieces(originalPieces);
    setShowHelp(false);
    // setStatus(Status.Success);
  }, [originalPieces]);

  const onRetry = useCallback(() => {
    setPieces(shuffledPieces);
    setShowHelp(false);
  }, [shuffledPieces]);

  return (
    <Box style={{ paddingTop: 12 }}>
      <Grid container spacing={4} direction={"column"}>
        <Grid item xs="auto">
          <DndProvider backend={HTML5Backend}>
            <div
              className="image-grid"
              style={{
                width: `${containerSize.width}px`,
                height: `${containerSize.height}px`,
              }}
            >
              {pieces.map((piece, index) => (
                <DraggableImage
                  key={piece.id}
                  piece={piece}
                  showHelp={showHelp}
                  onDrop={(sourceId, targetId) => {
                    const updatedPieces = [...pieces];
                    const sourceIndex = updatedPieces.findIndex(
                      (item) => item.id === sourceId
                    );
                    const targetIndex = updatedPieces.findIndex(
                      (item) => item.id === targetId
                    );
                    if (sourceIndex > -1 && targetIndex > -1) {
                      setNoOfMoves((p) => p + 1);
                      const sourcePiece = updatedPieces[sourceIndex];
                      updatedPieces[sourceIndex] = updatedPieces[targetIndex];
                      updatedPieces[targetIndex] = sourcePiece;
                      setPieces(updatedPieces);
                    }
                  }}
                />
              ))}
            </div>
          </DndProvider>
        </Grid>
        <Grid item xs="auto">
          <Stack spacing={2} direction={"row-reverse"}>
            <Button variant="contained" onClick={onSolve}>
              Solve
            </Button>
            <Button variant="contained" onClick={onRetry}>
              Retry
            </Button>
            <Button variant="contained" onClick={() => setShowHelp(!showHelp)}>
              {showHelp ? "No Help" : "Show Help"}{" "}
            </Button>
            <Typography>Number of Moves: {noOfMoves}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default PicturePuzzleScreen;
