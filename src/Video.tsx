import { useAspect, useTexture, useVideoTexture } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import { TextureLoader } from "three";

const Video = () => {
  return (
    <Canvas orthographic>
      <Scene />
    </Canvas>
  );
};

const Scene = () => {
  const size = useAspect(1800, 1000);
  return (
    <mesh scale={size}>
      <planeGeometry />
      <Suspense fallback={<FallbackMaterial url="/10.jpg" />}>
        <VideoMaterial url="/10.mp4" />
      </Suspense>
    </mesh>
  );
};

const VideoMaterial = ({ url }) => {
  const texture = useVideoTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
};

const FallbackMaterial = ({ url }) => {
  const texture = useLoader(TextureLoader, url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
};

export default Video;
