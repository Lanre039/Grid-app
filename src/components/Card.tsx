import React from "react";
import { Items } from "../pages/types";

function Card({ shape, color }: Items): JSX.Element {
  const triangleBg = shape === "triangle" ? color : "transparent";
  return (
    <div className="main_bg">
      <div
        style={{
          borderBottomColor: triangleBg,
          borderBottomWidth: "81px",
          borderBottomStyle: "solid",
        }}
        className={`${shape} ${shape !== "triangle" ? color : ""}`}
      ></div>
    </div>
  );
}

export default Card;
