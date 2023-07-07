import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import NaturalSphere from "./NaturalSphere";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
      <NaturalSphere />
      {/* <Experience /> */}
    </Canvas>
  </React.StrictMode>
);
