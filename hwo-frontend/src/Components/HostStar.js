// src/components/HostStar.js
import React, { useMemo } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

const texturePaths = [
    `${process.env.PUBLIC_URL}/assets/noises/noiseTexture1.png`,
    `${process.env.PUBLIC_URL}/assets/noises/noiseTexture2.png`,
    `${process.env.PUBLIC_URL}/assets/noises/noiseTexture3.png`,
    `${process.env.PUBLIC_URL}/assets/noises/noiseTexture4.png`,
    `${process.env.PUBLIC_URL}/assets/noises/noiseTexture5.png`,
    `${process.env.PUBLIC_URL}/assets/noises/noiseTexture6.png`,
    `${process.env.PUBLIC_URL}/assets/noises/noiseTexture7.png`,
    `${process.env.PUBLIC_URL}/assets/noises/noiseTexture8.png`,
  ];

function HostStar({ system, onClick, isSelected }) {
  const { starData } = system;

  const {
    cartesian_x,
    cartesian_y,
    cartesian_z,
    st_teff,
    st_rad,
    st_spectype_cleaned,
  } = starData;

  const zOffset = 99; 

  const randomTexturePath = useMemo(() => {
    return texturePaths[Math.floor(Math.random() * texturePaths.length)];
  }, []);

  const texture = useLoader(THREE.TextureLoader, randomTexturePath);

  // Set texture properties
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  // Check if cartesian coordinates exist
  if (cartesian_x === null || cartesian_y === null || cartesian_z === null) {
    return null; // Skip rendering if coordinates are missing
  }

  // Use the Cartesian coordinates directly
  const position = [cartesian_x, cartesian_y, cartesian_z +zOffset];

  // Adjust position scaling to fit the stars within the scene
  const positionScale = 1;
  const scaledPosition = position.map((coord) => coord * positionScale);

  // Adjust the star's size relative to the Sun's new size (e.g., 0.1 units)
  const sunSize = 0.25;
  const starSize = isFinite(st_rad) && st_rad > 0 ? st_rad * sunSize : sunSize; // Default to sunSize if invalid

  // Function to compare two THREE.Color objects
  const colorsAreEqual = (color1, color2) => {
    return (
      color1.r === color2.r && color1.g === color2.g && color1.b === color2.b
    );
  };

  // Function to map spectral type to color
  const getSpectralTypeColor = (spectralType) => {
    switch (spectralType) {
      case "O":
        return new THREE.Color("#5875e1"); // Blue
      case "B":
        return new THREE.Color("#7fa9ff"); // Bluish white
      case "A":
        return new THREE.Color("#c0ddff"); // White
      case "F":
        return new THREE.Color("#fff8dc"); // Yellowish white
      case "G":
        return new THREE.Color("#ffecb3"); // Yellow
      case "K":
        return new THREE.Color("#ffb366"); // Light orange
      case "M":
        return new THREE.Color("#ff7043"); // Orangish red
      case "L":
        return new THREE.Color("#ff6347"); // L-type, red-brown
      case "T":
        return new THREE.Color("#8a5a44"); // T-type, dark brown/gray
      case "D":
        return new THREE.Color("#f0f0f0"); // White dwarfs (D-type)
      default:
        return new THREE.Color("#c0c0c0"); // Bright grey as default color
    }
  };

  // Function to map temperature to color (this can override the spectral type)
  const getTemperatureColor = (teff) => {
    if (teff >= 33000) return new THREE.Color("#5875e1"); // O-type (blue)
    if (teff >= 10000) return new THREE.Color("#7fa9ff"); // B-type (bluish white)
    if (teff >= 7300) return new THREE.Color("#c0ddff"); // A-type (white)
    if (teff >= 6000) return new THREE.Color("#fff8dc"); // F-type (yellowish white)
    if (teff >= 5300) return new THREE.Color("#ffecb3"); // G-type (yellow)
    if (teff >= 3900) return new THREE.Color("#ffb366"); // K-type (light orange)
    if (teff >= 2300) return new THREE.Color("#ff7043"); // M-type (orangish red)
    if (teff >= 1300) return new THREE.Color("#ff6347"); // L-type (red-brown)
    if (teff >= 550) return new THREE.Color("#8a5a44");
    return new THREE.Color("#c0c0c0"); // Bright grey if null
  };
  // Get the star's color based on its temperature
  let specTypeColor = getSpectralTypeColor(st_spectype_cleaned);
  let temperatureColor = getTemperatureColor(st_teff);

  let starColor = specTypeColor;

  if (!colorsAreEqual(specTypeColor, temperatureColor)) {
    starColor = temperatureColor;
  }
  return (
    <group position={scaledPosition}>
      {/* Host Star */}
      <mesh>
  {/* Star geometry */}
  <sphereGeometry args={[starSize * 1, 32, 32]} /> {/* Slightly larger size for the emissive glow effect */}
  
  {/* Combine the star's surface and glow into one material */}
  <meshStandardMaterial
    map={texture} // Texture of the star surface
    color={starColor} // Base color of the star
    emissive={starColor} // Use emissive color for the glow effect
    emissiveMap={texture} // Emissive map if needed (or remove if unnecessary)
    emissiveIntensity={5} // Stronger intensity for glow
    transparent={true}
    opacity={1} // Slight transparency
  />
</mesh>

    </group>
  );
}

export default HostStar;
