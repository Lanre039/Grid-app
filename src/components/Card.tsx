import React from "react";

function Card({ shape, color }: { shape: string; color: string }) {
  return (
    <div className="main_bg">
      <div className={`${color} ${shape}`}></div>
    </div>
  );
}

export default Card;
