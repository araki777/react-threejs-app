import { useGLTF } from "@react-three/drei";
import { Size } from "@react-three/fiber";
import React, { createContext, useContext } from "react";
import * as THREE from "three";

const context = createContext("");
const Computers = (props: Size) => {
  const { nodes: n, materials: m } = useGLTF("/computers_1-transformed.glb");
  const instances = useContext(context);
  return <group {...props} dispose={null}></group>;
};

export default Computers;
