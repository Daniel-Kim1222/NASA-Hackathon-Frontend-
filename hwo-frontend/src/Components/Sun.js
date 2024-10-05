import React from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Line, Text } from "@react-three/drei"; // Import Line and Text from drei
import "@fontsource/press-start-2p";

function Sun() {
  const sunScale = 0.25; // Sun's radius set to 0.25 units
  const sunTexture = useLoader(THREE.TextureLoader, "/assets/sun.png");

  const glowColor = new THREE.Color("#faa04d");

  // Line points for the white line near the Sun
  const linePoints = [
    [0, 0, 99], // Start of the line at the center of the Sun
    [0.5, 0.5, 99], // End of the line (slightly offset to the right)
    [0.75, 0.5, 99],
  ];

  return (
    <>
      {/* Sun Mesh */}
      <mesh position={[0, 0, 99]}>
        <sphereGeometry args={[sunScale * 0.99, 100, 100]} />
        <meshBasicMaterial
          map={sunTexture}
          transparent={true} // Enable transparency
          opacity={1}
        />
      </mesh>

      {/* Sun Glow */}
      <mesh position={[0, 0, 99]}>
        <sphereGeometry args={[sunScale * 1, 32, 32]} />{" "}
        <meshBasicMaterial
          color={glowColor}
          blending={THREE.AdditiveBlending} // Additive blending for glow effect
          transparent={true}
          opacity={0.1}
        />
      </mesh>

      {/* White Line */}
      <Line
        points={linePoints} // Line's start and end points
        color="white"
        lineWidth={1} // Adjust line thickness
        transparent={true}
        opacity={1}
      />

      {/* Text Label "SUN" */}
      <Text
        position={[0.77, 0.5, 99]} // Position slightly beyond the end of the line
        fontSize={0.1} // Adjust text size
        color="white" // Text color
        anchorX="left" // Align the text to the left of the position
        anchorY="middle"
        font="/assets/PressStart2P-Regular.ttf"
      >
        SUN
      </Text>
    </>
  );
}

export default Sun;
