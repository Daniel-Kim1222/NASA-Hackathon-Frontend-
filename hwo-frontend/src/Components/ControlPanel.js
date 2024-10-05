// src/components/ControlPanel.js
import React from "react";
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  Text,
  Tooltip,
  Button,
  HStack,
} from "@chakra-ui/react";

function ControlPanel({
  zoomValue,
  onZoomChange,
  onReset,
  onZoomOut,
  minZoomValue,
  maxZoomValue,
}) {
  return (
    <Box
      position="absolute"
      bottom="10px"
      left="50%"
      transform="translateX(-50%)"
      zIndex="10"
      bg="brand.200"
      p={4}
      borderRadius="md"
      color="brand.500"
      width="300px"
      maxHeight="50vh"
      overflowY="auto"
    >
      <VStack spacing={4} align="stretch">
        {/* Zoom Control */}
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          Zoom
        </Text>
        <Slider
          aria-label="zoom-slider"
          value={zoomValue}
          min={minZoomValue}
          max={maxZoomValue}
          step={100}
          onChange={onZoomChange}
          width="100%"
        >
          <SliderTrack bg="brand.700" height="8px">
            <SliderFilledTrack bg="brand.600" />
          </SliderTrack>
          <Tooltip label={`Zoom: ${zoomValue}`} hasArrow>
            <SliderThumb boxSize={4} bg="brand.500" />
          </Tooltip>
        </Slider>

        {/* Reset Button */}
        <HStack>
        <Button bgColor={"brand.500"} color={"brand.700"} onClick={onReset}>
          Reset
        </Button>
        <Button bgColor={"brand.500"} color={"brand.700"} onClick={onZoomOut}>
          Zoom Out
        </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default ControlPanel;