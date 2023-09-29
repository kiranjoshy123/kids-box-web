import { useDrag, useDrop } from "react-dnd";
import { Avatar } from "@mui/material";

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
      style={{ ...piece.style, opacity, border, cursor: "pointer" }}
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

export default DraggableImage;
