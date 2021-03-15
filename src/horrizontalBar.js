import React from "react";
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  
export const HorrizontalBar = ({ divWidth, divStart, index, obj }) => {
  return (
    <div
      class="tooltip"
      draggable="true"
      style={{
        transform: `translate(${divStart * 76}px,${
          (index + 1) * 28 + index * 13
        }px)`,
        draggable: true,
        axis: 'x',
        
      }}
    >
      <span class="tooltiptext">
        {obj.start}-{obj.end}
      </span>
      <div
        style={{
          width: divWidth * 75.7,
          height: 37,
          backgroundColor: `${getRandomColor()}`,
          position: "absolute",
          overflow: "hidden",
          textAlign: "center",
          borderRadius: "60px",
          border: "2px solid",
        }}
        contentEditable="true"
      >
        {obj.name}
      </div>
    </div>
  );
};
