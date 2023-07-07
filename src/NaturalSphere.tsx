import {
  AccumulativeShadows,
  Center,
  Environment,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";
import { PresetsType } from "@react-three/drei/helpers/environment-assets";
import { useControls } from "leva";
import { useState, useTransition } from "react";

const NaturalSphere = () => {
  return (
    <>
      <group position={[0, -0.65, 0]}>
        <Sphere />
        <AccumulativeShadows
          temporal
          frames={200}
          color="purple"
          colorBlend={0.5}
          opacity={1}
          scale={10}
          alphaTest={0.85}
        >
          <RandomizedLight
            amount={8}
            radius={5}
            ambient={0.5}
            position={[5, 3, 2]}
            bias={0.001}
          ></RandomizedLight>
        </AccumulativeShadows>
      </group>
      <Env />
      <OrbitControls
        autoRotate
        autoRotateSpeed={4}
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 2.1}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
};

const Sphere = () => {
  const { roughness } = useControls({
    roughness: { value: 1, min: 0, max: 1 },
  });

  return (
    <Center top>
      <mesh castShadow>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshStandardMaterial metalness={1} roughness={roughness} />
      </mesh>
    </Center>
  );
};

const Env = () => {
  const [preset, setPreset] = useState<PresetsType>("sunset");
  const [inTransition, startTransition] = useTransition();
  const { blur } = useControls({
    blur: { value: 0.65, min: 0, max: 1 },
    preset: {
      value: preset,
      options: [
        "sunset",
        "dawn",
        "night",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "city",
        "park",
        "lobby",
      ],
      onChange: (value: PresetsType) => startTransition(() => setPreset(value)),
    },
  });
  return <Environment preset={preset} background blur={blur} />;
};

export default NaturalSphere;
