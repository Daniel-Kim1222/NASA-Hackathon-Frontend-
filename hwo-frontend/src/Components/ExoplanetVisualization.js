// src/components/ExoplanetVisualization.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import HostStar from "./HostStar";
import Exoplanet from "./Exoplanet";
import Sun from "./Sun";
import ControlPanel from "./ControlPanel";
import { Text } from "@react-three/drei";

function ExoplanetVisualization({ data }) {
  const [zoomValue, setZoomValue] = useState(2900);
  const [rotateXValue, setRotateXValue] = useState(-0);
  const [rotateYValue, setRotateYValue] = useState(0);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cameraRef = useRef();

  const minZoomValue = 0;
  const maxZoomValue = 3000;

  // Memoize updateCamera using useCallback
  const updateCamera = useCallback(() => {
    if (cameraRef.current) {
      const theta = (Math.PI / 180) * rotateXValue; // Vertical angle
      const phi = (Math.PI / 180) * rotateYValue; // Horizontal angle
      const distance = maxZoomValue - zoomValue;

      // Calculate camera position in spherical coordinates
      const x = distance * Math.cos(theta) * Math.sin(phi);
      const y = distance * Math.sin(theta);
      const z = distance * Math.cos(theta) * Math.cos(phi);

      cameraRef.current.position.set(x, y, z);
      cameraRef.current.lookAt(0, 0, 0); // Look at the origin
      cameraRef.current.updateProjectionMatrix();
    }
  }, [cameraRef, rotateXValue, rotateYValue, zoomValue, maxZoomValue]);

  // Update camera when state changes
  useEffect(() => {
    updateCamera();
  }, [zoomValue, rotateXValue, rotateYValue, updateCamera]);

  // Handlers for controls
  const handleZoomChange = (value) => {
    setZoomValue(value);
  };

  const handleReset = () => {
    setZoomValue(2900);
    setRotateXValue(0);
    setRotateYValue(0);
  };

  const handleZoomOut = () => {
    setZoomValue(2200);
    setRotateXValue(0);
    setRotateYValue(0);
  };

  // Mouse down event to start dragging
  const handleMouseDown = (event) => {
    setIsDragging(true);
    setLastMousePosition({ x: event.clientX, y: event.clientY });
  };

  // Mouse move event to rotate the view while dragging
  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - lastMousePosition.x;
    const deltaY = event.clientY - lastMousePosition.y;

    setRotateYValue((prevY) => prevY + deltaX * 0.05); // Horizontal rotation
    setRotateXValue((prevX) => prevX - deltaY * 0.05); // Vertical rotation

    setLastMousePosition({ x: event.clientX, y: event.clientY });
  };

  // Mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Stop dragging if the mouse leaves the canvas
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Initialize camera on mount
  useEffect(() => {
    if (cameraRef.current) {
      updateCamera();
    }
  }, [cameraRef, updateCamera]);

  useEffect(() => {
    updateCamera();
  }, [zoomValue, rotateXValue, rotateYValue, updateCamera]);

  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, maxZoomValue - zoomValue],
          fov: 70,
          near: 0.1,
          far: maxZoomValue + 1000,
        }}
        style={{ width: "100%", height: "100vh", background: "#000000" }}
        onCreated={({ camera }) => {
          cameraRef.current = camera;
          updateCamera();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <ambientLight intensity={1} />
        {/* Render HostStars excluding the Sun */}
        {Object.values(data)
          .filter(
            (system) =>
              system.starData.cartesian_x !== null &&
              system.starData.cartesian_y !== null &&
              system.starData.cartesian_z !== null
          )
          .map((system, systemIndex) => (
            <React.Fragment key={systemIndex}>
              <HostStar system={system} />
              {system.exoplanets.map((planet, planetIndex) => (
                <Exoplanet
                  key={`${system.starData.hostname}-${planetIndex}`}
                  planet={planet}
                  starPosition={[
                    system.starData.cartesian_x,
                    system.starData.cartesian_y,
                    system.starData.cartesian_z,
                  ]}
                  starSize={system.starData.st_rad}
                />
              ))}
            </React.Fragment>
          ))}
        {/* Render the Sun */}
        <Sun />
        <Text
          position={[-485, 500, 0]}
          fontSize={60}
          color="#ffea2e"
          anchorX="middle"
          anchorY="top"
          font={`${process.env.PUBLIC_URL}/assets/PressStart2P-Regular.ttf`}
          rotation={[6 * (Math.PI / 180), 0, 0.1 * (Math.PI / 180)]}
        >
          MILKY WAY GALAXY
        </Text>
      </Canvas>
      <ControlPanel
        zoomValue={zoomValue}
        onZoomChange={handleZoomChange}
        minZoomValue={minZoomValue}
        maxZoomValue={maxZoomValue}
        onReset={handleReset}
        onZoomOut={handleZoomOut}
      />
    </>
  );
}

export default ExoplanetVisualization;
