import { Grow, Slide, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const StatusArea = ({ gif }) => {
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    setShowGif(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowGif(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Stack spacing={5} paddingLeft={5}>
      <Typography variant="h5">Wow... Great Job!!</Typography>
      <Slide
        direction="top"
        in={showGif}
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
        <img src={gif} alt="status gif" width={256} height={256} />
      </Slide>
    </Stack>
  );
};

export default StatusArea;
