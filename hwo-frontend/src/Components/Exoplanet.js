// src/components/Exoplanet.js
import React, { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Exoplanet({ planet, starPosition, starSize }) {
  const {
    pl_orbsmax, // Orbit semi-major axis
    pl_rade, // Planet radius in Earth Radii
    pl_ratror, // Ratio of Planet Radius to Star Radius
    pl_orbper, // Orbital period
    pl_type, // Planet type
    pl_orbincl,
  } = planet;

  const getImagePath = (typ) => {
    if (typ === "Gas Giants")
      return `${process.env.PUBLIC_URL}/assets/images/gas_giant.jpeg`; // Gas Giant (orangish red)
    if (typ === "Terrestrial")
      return `${process.env.PUBLIC_URL}/assets/images/terrestrial.jpeg`; // Terrestrial (yellowish red)
    if (typ === "Neptune-Like")
      return `${process.env.PUBLIC_URL}/assets/images/neptune-like.jpeg`; // Gas Giant (blue)
    if (typ === "Super-Earth")
      return `${process.env.PUBLIC_URL}/assets/images/super-earth.jpeg`;
    return `${process.env.PUBLIC_URL}/assets/images/default.png`;
  };

  let plImagePath = getImagePath(pl_type);

  const planetTexture = useLoader(THREE.TextureLoader, plImagePath);

  const planetRef = useRef();

  const zOffset = 97;

  // Define the same scaling factor used for stars
  const sunSize = 2;

  // Calculate orbit radius (scaling for the scene)
  const orbitScale = 1;
  const orbitRadius = (pl_orbsmax || 1) * orbitScale;

  // Calculate planet size
  let planetSize;

  if (isFinite(pl_ratror) && pl_ratror > 0) {
    // Use ratio of planet radius to star radius with consistent scaling
    const scaledStarSize =
      isFinite(starSize) && starSize > 0 ? starSize * sunSize : sunSize;
    planetSize = pl_ratror * scaledStarSize;
  } else if (isFinite(pl_rade) && pl_rade > 0) {
    // Convert planet radius from Earth Radii to the same scale as starSize
    planetSize = (pl_rade / 109) * sunSize; // Adjust scaling factor as needed
  } else {
    planetSize = 0.05; // Default small size if data is missinog
  }

  // Ensure planetSize is valid
  planetSize = isFinite(planetSize) && planetSize > 0 ? planetSize : 0.05;
  // Animate planet's orbit with inclination
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const angle = (time / pl_orbper) * Math.PI * 2; // Adjust orbit speed

    // Convert inclination from degrees to radians
    const inclination = isFinite(pl_orbincl) ? (pl_orbincl * Math.PI) / 180 : 0;

    // Apply inclination by rotating the orbit plane
    const x = orbitRadius * Math.cos(angle);
    const z = orbitRadius * Math.sin(angle) * Math.cos(inclination);
    const y = orbitRadius * Math.sin(angle) * Math.sin(inclination);

    planetRef.current.position.x = starPosition[0] + x;
    planetRef.current.position.z = starPosition[2] + z + zOffset;
    planetRef.current.position.y = starPosition[1] + y;
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[planetSize, 16, 16]} />
      <meshBasicMaterial
        map={planetTexture}
        transparent={true} // Enable transparency
        opacity={1}
      />
    </mesh>
  );
}

export default Exoplanet;
