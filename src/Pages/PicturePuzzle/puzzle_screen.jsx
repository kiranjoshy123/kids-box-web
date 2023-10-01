import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
// // import { getSuccessGifs } from "../../components/gifs";
import { randomNumber, shuffle } from "../../utilities/generate";
// // import Status from "../../constants/status";
import { Box, Button, Grid, Stack, Typography, Zoom } from "@mui/material";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DraggableImage from "./draggable_image";
import "./picture_puzzle.css";
import Status from "../../constants/status";
import { getSuccessGifs } from "../../components/gifs";
import StatusArea from "./git_area";
import MessageBox from "../../components/message_box";

const maxMoves = 30;
const PicturePuzzleScreen = () => {
  const { state } = useLocation();
  const [status, setStatus] = useState(Status.InProgress);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [noOfMoves, setNoOfMoves] = useState(0);
  const [pieces, setPieces] = useState([]);
  const [shuffledPieces, setShuffledPieces] = useState([]);
  const [originalPieces, setOriginalPieces] = useState([]);

  useEffect(() => {
    setStatus(Status.InProgress);
  }, []);

  useEffect(() => {
    if (
      pieces.length !== 0 &&
      originalPieces.length !== 0 &&
      _.isEqual(pieces, originalPieces)
    ) {
      setStatus(Status.Success);
    } else if (noOfMoves > maxMoves) {
      setShowMessageBox(true);
    }
  }, [pieces]);

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
    let tranistionDelay = 100;
    const items = Array.from({ length: 16 }, (_, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      const backgroundPositionX = (col * 100) / 3;
      const backgroundPositionY = (row * 100) / 3;
      tranistionDelay += 50;

      return {
        index: index,
        tranistionDelay: tranistionDelay,
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

  const onSolve = () => {
    setPieces(originalPieces);
    setShowHelp(false);
    setNoOfMoves(0);
    setStatus(Status.Success);
  };

  const onRetry = useCallback(() => {
    setPieces(shuffledPieces);
    setShowHelp(false);
    setStatus(Status.InProgress);
    setNoOfMoves(0);
  }, [shuffledPieces]);

  return (
    <Box style={{ paddingTop: 12 }}>
      <Grid container spacing={4}>
        <Grid item xs="auto">
          <Stack direction={"row"} spacing={2}>
            <DndProvider backend={HTML5Backend}>
              <div
                className="image-grid"
                style={{
                  width: `${containerSize.width}px`,
                  height: `${containerSize.height}px`,
                }}
              >
                {pieces.map((piece, _) => (
                  <Zoom
                    in={true}
                    key={piece.id}
                    style={{
                      transitionDelay: `${piece.tranistionDelay}ms`,
                    }}
                  >
                    <div>
                      <DraggableImage
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
                            updatedPieces[sourceIndex] =
                              updatedPieces[targetIndex];
                            updatedPieces[targetIndex] = sourcePiece;
                            setPieces(updatedPieces);
                          }
                        }}
                      />
                    </div>
                  </Zoom>
                ))}
              </div>
            </DndProvider>
            {status === Status.Success && (
              <StatusArea gif={getSuccessGifs()[randomNumber(0, 10)]} />
            )}
            {status !== Status.Success && showHelp && (
              <Box paddingLeft={5}>
                <img src={state?.img} alt="original" width={256} height={256} />
              </Box>
            )}
          </Stack>
        </Grid>
        <Grid item xs="auto">
          <Stack spacing={2} direction={"row"} alignItems="flex-end">
            <Button
              variant="contained"
              disabled={status === Status.Success}
              onClick={() => onSolve()}
            >
              Solve
            </Button>
            <Button variant="contained" onClick={onRetry}>
              Retry
            </Button>
            <Button variant="contained" onClick={() => setShowHelp(!showHelp)}>
              {showHelp ? "No Help" : "Show Help"}{" "}
            </Button>
            <Stack direction={"row"} spacing={1}>
              <Typography alignSelf="flex-end">Number of Moves:</Typography>
              <Typography alignSelf="flex-end" color="orange">
                {noOfMoves}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <MessageBox
        open={showMessageBox}
        onClose={() => setShowMessageBox(false)}
        title="Game Over"
        description="You have reached maximum number of moves allowed. Please retry the game again. Good luck!!"
        onOK={() => {
          setShowMessageBox(false);
          onRetry();
        }}
      />
    </Box>
  );
};

export default PicturePuzzleScreen;
