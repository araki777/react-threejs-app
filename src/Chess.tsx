import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

const Chess = () => {
  const gltf = useGLTF<string>("/chess_set_4k.gltf");
  const nodes = gltf.scene.children;
  const pieceList: THREE.Object3D<THREE.Event>[] = [];
  // const value = 0.05788809061050414;
  // const minHeight = 0.20226484537124634;
  // const maxHeight = -0.20295178890228266;
  // const minWidth = 0.2022649049758911;
  // const maxWidth = -0.20295172929763788;
  let board: THREE.Object3D<THREE.Event> | null = null;
  const [modelLoaded, setModelLoaded] = useState(false);
  const squareRefs = useRef<
    Array<React.MutableRefObject<HTMLDivElement | null>>
  >([]);
  const pieceRefs = useRef<
    Array<React.MutableRefObject<THREE.Object3D<THREE.Event> | null>>
  >([]);

  0.20226484537124634;
  0.2022649049758911;

  for (const node of nodes) {
    if (node.name == "board") {
      board = node;
    } else {
      pieceList.push(node);
    }
  }

  pieceList.forEach((piece, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    pieceRefs.current[index] = useRef(null); // 初期値をnullに設定
  });

  useEffect(() => {
    setModelLoaded(true);
  }, []);

  const handleClick = () => {
    console.log("AAAAAAAAAAA");
  };

  return (
    <>
      {modelLoaded && (
        <group>
          <primitive object={board!} />
        </group>
      )}
      {modelLoaded &&
        pieceList.map((piece, index) => (
          <group key={index}>
            <primitive object={piece} ref={pieceRefs.current[index]} />
          </group>
        ))}
      <Html>
        <button onClick={handleClick}>クリックしてください</button>
      </Html>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
    </>
  );
};

export default Chess;
