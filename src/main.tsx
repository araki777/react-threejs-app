import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import NaturalSphere from "./NaturalSphere";
import "./main.css";
import Chess from "./Chess";
import Video from "./Video";
import Game from "./Game";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Chess /> */}
    {/* <NaturalSphere /> */}
    {/* <Experience /> */}
    {/* <Video /> */}
    <Game />
  </React.StrictMode>
);
