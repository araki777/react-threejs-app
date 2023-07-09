import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, quat } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";
import pingSound from "./resources/ping.mp3";
import { Text } from "@react-three/drei";

const ping = new Audio(pingSound);
let isPingReady = false;

ping.oncanplay = () => {
  isPingReady = true;
};

const playPingSound = () => {
  if (ping.paused) {
    if (isPingReady) {
      ping.play();
    } else {
      ping.oncanplay = () => {
        ping.play();
      };
    }
  } else {
    ping.currentTime = 0;
  }
};

const Game = () => {
  const [startGame, setStartGame] = useState(false); // ゲームの開始状態を管理するステート
  const [score, setScore] = useState(0);

  const handleStartGame = () => {
    setStartGame(true); // クリック時にゲームの開始状態を更新
  };

  const handleResetBall = () => {
    setScore(0); // スコアをリセット
  };

  return (
    <Canvas camera={{ position: [0, 5, 12], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={0.5} />
      <Physics gravity={[0, -10, 0]}>
        {startGame ? (
          <>
            <Ball
              onScore={() => setScore((prevScore) => prevScore + 1)}
              onSound={() => playPingSound()}
              onReset={handleResetBall}
              resetScore={() => setScore(0)}
            />
            <Paddle />
            <Score score={score} />
            <MovingBox position={[-2, 1.5, 0]} />
            <MovingBox position={[2, 1.5, 0]} />
          </>
        ) : (
          <StartScreen onClick={handleStartGame} />
        )}
      </Physics>
    </Canvas>
  );
};

const StartScreen = ({ onClick }) => {
  return (
    <group>
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="white" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 0, -4.9]}>
        <Text fontSize={1} lineHeight={1}>
          Click to continue
        </Text>
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh position={[0, 0, -4.8]} onClick={onClick}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};

const Ball = ({ onScore, onSound, onReset, resetScore }) => {
  const ref = useRef(null!);
  const startPosition = [0, 1.5, 0];
  const startVelocity = [0, -5, 0];
  const onCollisionEnter = (event) => {
    if (event.rigidBodyObject.colliders === "hull") {
      onSound();
    }
    if (event.rigidBodyObject.colliders === "cuboid") {
      onScore();
      onSound();
    }
  };

  const resetPosition = () => {
    const position = new THREE.Vector3(
      startPosition[0],
      startPosition[1],
      startPosition[2]
    );
    const velocity = new THREE.Vector3(
      startVelocity[0],
      startVelocity[1],
      startVelocity[2]
    );

    // ボールの位置、回転、角速度をリセット
    if (ref.current) {
      ref.current.setTranslation(position, true);
      ref.current.setLinvel(velocity, true);
    }
  };

  useFrame(() => {
    const position = ref.current.translation();
    if (position.y < -20) {
      resetPosition();
      resetScore();
    }
  });

  return (
    <>
      <RigidBody
        ref={ref}
        colliders="ball"
        mass={1}
        onCollisionEnter={onCollisionEnter}
      >
        <mesh>
          <sphereGeometry args={[0.75, 32, 32]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
    </>
  );
};

const Paddle = ({
  euler = new THREE.Euler(),
  quaternion = new THREE.Quaternion(),
}) => {
  const ref = useRef(null!);
  useFrame(({ pointer, viewport }) => {
    if (ref.current) {
      ref.current!.setTranslation({
        x: (pointer.x * viewport.width) / 2,
        y: -viewport.height / 3,
        z: 0,
      });
      ref.current!.setRotation(
        quaternion.setFromEuler(euler.set(0, 0, (pointer.x * Math.PI) / 10))
      );
    }
  });

  return (
    <RigidBody ref={ref} colliders="cuboid" type="fixed" restitution={2.1}>
      <mesh>
        <boxGeometry args={[4, 1, 1]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </RigidBody>
  );
};

const Score = ({ score }) => {
  const { viewport } = useThree();

  return (
    <Text
      fontSize={0.5}
      position={[viewport.width / 2 - 1, viewport.height / 2 - 1, -10]}
    >
      Score: {score}
    </Text>
  );
};

const MovingBox = ({ position }) => {
  const ref = useRef(null!);

  useFrame(() => {
    if (ref.current) {
      const newX = position[0] + Math.sin(performance.now() * 0.002) * 2;
      ref.current!.setTranslation({ x: newX, y: position[1], z: position[2] });
    }
  });

  return (
    <RigidBody
      ref={ref}
      colliders="hull"
      type="kinematicPosition"
      restitution={0.5}
    >
      <mesh position={position}>
        <boxGeometry args={[3, 1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </RigidBody>
  );
};

export default Game;
