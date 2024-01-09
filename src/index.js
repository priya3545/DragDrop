import React from "react";
import ReactDOM from "react-dom/client";
import CardTemplate from "./components/CardTemplate";
import data from "./data.json";
import "./styles.css";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div className="container">
    <CardTemplate data={data} />
  </div>
);
