import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Box,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  Text,
  Tooltip,
  HStack,
} from "@chakra-ui/react";

function RightDrawer({ applyFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  // State for each filter
  const [maxDistance, setMaxDistance] = useState(null);
  const [wavelength, setWavelength] = useState(null);
  const [esi, setEsi] = useState(null);
  const [discoveryMethod, setDiscoveryMethod] = useState(null);
  const [telescopeDiameter, setTelescopeDiameter] = useState(null);

  // Toggle Drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Handle API call to apply filters
  const handleApplyFilters = async () => {
    const payload = {};

    if (maxDistance !== null) payload.max_distance = maxDistance;
    if (telescopeDiameter !== null)
      payload.telescope_diameter = telescopeDiameter;
    if (wavelength !== null) payload.wavelength = wavelength;
    if (esi !== null) payload.esi_threshold = esi;
    if (discoveryMethod !== null) payload.discovery_method = discoveryMethod;

    // If all filters are null, default max_distance to 8600
    if (
      maxDistance === null &&
      wavelength === null &&
      esi === null &&
      discoveryMethod === null &&
      telescopeDiameter === null
    ) {
      payload.max_distance = 8600;
    }

    try {
      const response = await fetch(
        "https://peaceful-atoll-81477-9628d63c0d01.herokuapp.com/api/data/filter/combined",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching filtered data");
      }

      const result = await response.json();
      console.log(result);
      applyFilters(result);
    } catch (err) {
      console.error("Error applying filters:", err);
    }
  };

  return (
    <>
      {/* Full-height box that takes up 10% of the page width */}
      <Box
        position="fixed"
        top="0"
        right="0"
        height="100vh"
        width="3vw" // Adjusted width for the closed drawer state
        bg="brand.200"
        zIndex="1000"
        display={isOpen ? "none" : "flex"} // Hide the button when the drawer is open
        justifyContent="flex-start" // Aligns triangle to the end of the box
        alignItems="center"
        transition="width 0.3s ease" // Smooth transition between states
        opacity={0.9}
      >
        {/* Triangle button */}
        <Box
          position="absolute"
          left="-30px" // Adjust to position the triangle correctly at the end
          top="50%" // Vertically center the triangle
          transform="translateY(-50%)" // Adjust for centering
          width="0"
          height="0"
          borderTop="50px solid transparent"
          borderBottom="50px solid transparent"
          borderRight={`30px solid #0a8c90`}
          cursor="pointer"
          onClick={toggleDrawer}
        />
      </Box>

      {/* Right Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={toggleDrawer}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent bg="brand.200" opacity={0.9}>
          <DrawerBody>
            <Box color="white" p={4}>
              <VStack>
                <Box my={5}>
                  <Text align="center" fontSize="xl" color="brand.500">
                    Observation Control
                  </Text>
                </Box>
                {/* Max Distance Slider */}
                <Box>
                  <Text align="center" fontSize="sm" color="brand.400">
                    Maximum Distance(parcecs)
                  </Text>
                  <Slider
                    defaultValue={0}
                    min={0}
                    max={8500}
                    step={25}
                    onChange={(value) => setMaxDistance(value)}
                    my={2}
                  >
                    <SliderTrack bg="brand.700" height="8px">
                      <SliderFilledTrack bg="brand.600" />
                    </SliderTrack>
                    <Tooltip label={`Max Distance: ${maxDistance}`} hasArrow>
                      <SliderThumb boxSize={4} bg="brand.500" />
                    </Tooltip>
                  </Slider>
                </Box>
                <HStack w="100%">
                  <Button
                    color={"brand.700"}
                    backgroundColor={"brand.500"}
                    onClick={handleApplyFilters}
                    fontSize={"md"}
                  >
                    Apply
                  </Button>
                  <Button
                    fontSize={"md"}
                    color={"brand.700"}
                    backgroundColor={"brand.500"}
                    onClick={() => {
                      setMaxDistance(null);
                      handleApplyFilters();
                    }}
                  >
                    Reset
                  </Button>
                </HStack>
                {/* Telescope & Diameter Slider */}
                <HStack w="100%">
                  <Button
                    color={"brand.700"}
                    backgroundColor={"brand.500"}
                    onClick={handleApplyFilters}
                    fontSize={"md"}
                  >
                    Apply
                  </Button>
                  <Button
                    fontSize={"md"}
                    color={"brand.700"}
                    backgroundColor={"brand.500"}
                    onClick={() => {
                      setMaxDistance(null);
                      handleApplyFilters();
                    }}
                  >
                    Reset
                  </Button>
                </HStack>
              </VStack>

              {/* Triangle button inside drawer */}
              <Box
                position="absolute"
                left="0px" // Positioned inside the drawer
                top="50%" // Vertically center the triangle
                transform="translateY(-50%)" // Flip the triangle
                width="0"
                height="0"
                borderTop="50px solid transparent"
                borderBottom="50px solid transparent"
                borderLeft={`30px solid #0a8c90`} // Reverse the direction
                cursor="pointer"
                onClick={toggleDrawer}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default RightDrawer;
