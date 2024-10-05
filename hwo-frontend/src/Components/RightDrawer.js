import React, { useState } from "react";
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
  SliderMark,
} from "@chakra-ui/react";

function RightDrawer({ applyFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxDistance, setMaxDistance] = useState(20); // Default value for max distance

  // Toggle Drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Handle API call to filter by distance
  const handleApplyFilters = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/data/filter/distance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          max_distance: maxDistance,
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching filtered data');
      }

      const result = await response.json();
      applyFilters(result);
    } catch (err) {
      console.error('Error applying filters:', err);
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
              {/* Max Distance Slider */}
              <p>Maximum Distance (in light-years)</p>
              <Slider
                defaultValue={20}
                min={0}
                max={1000}
                step={10}
                onChange={(value) => setMaxDistance(value)}
                mb={4}
              >
                <SliderMark value={maxDistance} mt="-10" ml="-2.5" fontSize="sm">
                  {maxDistance}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>

              {/* Button to apply filters */}
              <Button colorScheme="teal" onClick={handleApplyFilters}>
                Apply Filters
              </Button>

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
