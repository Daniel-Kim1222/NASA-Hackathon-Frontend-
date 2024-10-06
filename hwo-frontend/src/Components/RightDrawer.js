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
  Select,
  Divider,
  Switch,
} from "@chakra-ui/react";

function RightDrawer({ applyFilters, onToggleHostStars }) {
  const [isOpen, setIsOpen] = useState(false);
  // State for each filter
  const [maxDistance, setMaxDistance] = useState(0);
  const [wavelength, setWavelength] = useState("");
  const [esi, setEsi] = useState(0);
  const [discoveryMethod, setDiscoveryMethod] = useState("");
  const [telescopeDiameter, setTelescopeDiameter] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);
  const [showHostStars, setShowHostStars] = useState(true);

  useEffect(() => {
    if (shouldReset) {
      handleApplyFilters(); // Only run after the states are updated
      setShouldReset(false); // Reset the flag
    }
  }, [maxDistance, telescopeDiameter, wavelength, shouldReset]);

  const handleReset = () => {
    setMaxDistance(0);
    setTelescopeDiameter(0);
    setWavelength("");
    setEsi(0);
    setDiscoveryMethod("");
    setShouldReset(true);
  };

  // Toggle Drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Handle API call to apply filters
  const handleApplyFilters = async () => {
    console.log(maxDistance);
    const payload = {};

    if (maxDistance !== 0) payload.max_distance = maxDistance;
    if (telescopeDiameter !== 0) payload.telescope_diameter = telescopeDiameter;
    if (wavelength !== "") payload.wavelength = parseFloat(wavelength);
    if (esi !== 0) payload.esi_threshold = esi;
    if (discoveryMethod !== "") payload.discovery_method = discoveryMethod;

    // If all filters are null, default max_distance to 8600
    if (
      maxDistance === 0 &&
      wavelength === "" &&
      esi === 0 &&
      discoveryMethod === "" &&
      telescopeDiameter === 0
    ) {
      payload.max_distance = 8600;
    }
    console.log(JSON.stringify(payload));
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

  const handleToggleHostStars = () => {
    setShowHostStars(!showHostStars); // Toggle visibility
    onToggleHostStars(!showHostStars); // Pass the value up to MainPage
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
                <Box my={1}>
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
                    value={maxDistance}
                    min={0}
                    max={8500}
                    step={25}
                    onChange={(value) => setMaxDistance(value)}
                    mt={2}
                  >
                    <SliderTrack bg="brand.700" height="8px">
                      <SliderFilledTrack bg="brand.600" />
                    </SliderTrack>
                    <Tooltip label={`Max Distance: ${maxDistance}`} hasArrow>
                      <SliderThumb boxSize={4} bg="brand.500" />
                    </Tooltip>
                  </Slider>
                </Box>
                <Divider borderColor="brand.400" my={0.5} />
                {/* Telescope & Diameter Slider */}
                <Box>
                  <Text align="center" fontSize="sm" color="brand.400">
                    Telescope Diameter(m) & Wavelength(µm)
                  </Text>
                  <Slider
                    value={telescopeDiameter}
                    min={0}
                    max={24.5}
                    step={0.1}
                    onChange={(value) => setTelescopeDiameter(value)}
                    mt={2}
                    mb={1}
                  >
                    <SliderTrack bg="brand.700" height="8px">
                      <SliderFilledTrack bg="brand.600" />
                    </SliderTrack>
                    <Tooltip
                      label={`Telescope Diameter: ${telescopeDiameter}`}
                      hasArrow
                    >
                      <SliderThumb boxSize={4} bg="brand.500" />
                    </Tooltip>
                  </Slider>
                  <Select
                    placeholder="Select Wavelength"
                    fontSize="sm"
                    value={wavelength}
                    onChange={(e) => setWavelength(e.target.value)}
                    bg="brand.600"
                    color="white"
                    borderColor="brand.700"
                    mb={1}
                    padding={0}
                    h="20px"
                    focusBorderColor="brand.500"
                  >
                    <option value="0.1">Far UV: 0.1 – 0.2 µm</option>
                    <option value="0.2">Near UV: 0.2 – 0.4 µm</option>
                    <option value="0.3">U-band: 0.3 – 0.4 µm</option>
                    <option value="0.4">B-band: 0.4 – 0.5 µm</option>
                    <option value="0.5">V-band: 0.5 – 0.6 µm</option>
                    <option value="0.6">R-band: 0.6 – 0.7 µm</option>
                    <option value="0.7">I-band: 0.7 – 0.8 µm</option>
                    <option value="1.0">Y-band: 1.0 – 1.1 µm</option>
                    <option value="1.1">J-band: 1.1 – 1.4 µm</option>
                    <option value="1.5">H-band: 1.5 – 1.8 µm</option>
                    <option value="2.0">K-band: 2.0 – 2.4 µm</option>
                    <option value="3.0">L-band: 3.0 – 4.0 µm</option>
                    <option value="4.5">M-band: 4.5 – 5.0 µm</option>
                    <option value="8.0">N-band: 8.0 – 13.0 µm</option>
                    <option value="16.0">Q-band: 16.0 – 20.0 µm</option>
                    <option value="30">S-band: 30 – 100 µm</option>
                    <option value="100">T-band: 100 – 300 µm</option>
                  </Select>
                </Box>
                <Divider borderColor="brand.400" my={0.5} />
                <Box>
                  <Text align="center" fontSize="sm" color="brand.400">
                    Earth Habitability Score
                  </Text>
                  <Slider
                    value={esi}
                    min={0.0}
                    max={1}
                    step={0.01}
                    onChange={(value) => setEsi(value)}
                    mt={2}
                  >
                    <SliderTrack bg="brand.700" height="8px">
                      <SliderFilledTrack bg="brand.600" />
                    </SliderTrack>
                    <Tooltip label={`ESI: ${esi}`} hasArrow>
                      <SliderThumb boxSize={4} bg="brand.500" />
                    </Tooltip>
                  </Slider>
                </Box>
                <Divider borderColor="brand.400" my={0.5} />
                <Box>
                  <Text align="center" fontSize="sm" color="brand.400" mb={2}>
                    Discovery Method
                  </Text>
                  <Select
                    placeholder="Select Discovery Method"
                    fontSize="sm"
                    value={discoveryMethod}
                    onChange={(e) => setDiscoveryMethod(e.target.value)}
                    bg="brand.600"
                    color="white"
                    borderColor="brand.700"
                    mb={1}
                    padding={0}
                    h="20px"
                    focusBorderColor="brand.500"
                  >
                    <option value="Microlensing">Microlensing</option>
                    <option value="Transit">Transit</option>
                    <option value="Radial Velocity">Radial Velocity</option>
                    <option value="Eclipse Timing Variations">
                      Eclipse Timing Variations
                    </option>
                    <option value="Imaging">Imaging</option>
                    <option value="Astrometry">Astrometry</option>
                    <option value="Transit Timing Variations">
                      Transit Timing Variations
                    </option>
                    <option value="Orbital Brightness Modulation">
                      Orbital Brightness Modulation
                    </option>
                    <option value="Pulsar Timing">Pulsar Timing</option>
                    <option value="Disk Kinematics">Disk Kinematics</option>
                    <option value="Pulsation Timing Variations">
                      Pulsation Timing Variations
                    </option>
                  </Select>
                </Box>
                <HStack w="100%">
                  <Button
                    color={"brand.700"}
                    backgroundColor={"brand.500"}
                    onClick={handleApplyFilters}
                    fontSize={"sm"}
                    width="100%"
                  >
                    Apply
                  </Button>
                  <Button
                    fontSize={"sm"}
                    color={"brand.700"}
                    backgroundColor={"brand.500"}
                    onClick={handleReset}
                    width="100%"
                  >
                    Reset
                  </Button>
                </HStack>
              </VStack>
              <Divider borderColor="brand.500" my={2} />
              <Box>
                <Text align="center" fontSize="sm" color="brand.400" mb={2}>
                  Show Host Stars
                </Text>
                <HStack justifyContent="center">
                  <Text color="white">Hide</Text>
                  <Switch
                    size="md"
                    bg="brand.700" // Background color when unchecked
                    colorScheme="brand" // Use your custom 'brand' color scheme for checked state
                    isChecked={showHostStars}
                    onChange={handleToggleHostStars}
                  />
                  <Text color="white">Show</Text>
                </HStack>
              </Box>

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
