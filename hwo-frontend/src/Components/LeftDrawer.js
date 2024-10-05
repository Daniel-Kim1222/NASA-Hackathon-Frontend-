import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Box,
  Text,
} from "@chakra-ui/react";

function LeftDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null); // Track the selected section

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSelectedSection(null); // Close the section box when the drawer closes
    }
  };
  const handleSectionClick = (section) => {
    setSelectedSection(section); // Set the clicked section
  };

  return (
    <>
      {/* Full-height box that takes up 10% of the page width */}
      <Box
        position="fixed"
        top="0"
        left="0"
        height="100vh"
        width="50px" // Adjusted width for the closed drawer state
        bg="brand.200"
        zIndex="1000"
        display={isOpen ? "none" : "flex"} // Hide the button when the drawer is open
        justifyContent="flex-end" // Aligns triangle to the end of the box
        alignItems="center"
        transition="width 0.3s ease" // Smooth transition between states
        opacity={0.9}
      >
        {/* Triangle button */}
        <Box
          position="absolute"
          right="-30px" // Adjust to position the triangle correctly at the end
          top="50%" // Vertically center the triangle
          transform="translateY(-50%)" // Adjust for centering
          width="0"
          height="0"
          borderTop="50px solid transparent"
          borderBottom="50px solid transparent"
          borderLeft={`30px solid #0a8c90`}
          cursor="pointer"
          onClick={toggleDrawer}
        />
      </Box>

      {/* Left Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={toggleDrawer}
        width="300px"
      >
        <DrawerOverlay />
        <DrawerContent bg="brand.200" opacity={0.9}>
          <DrawerBody>
            <Box color="white" p={4}>
              {/* Content inside drawer */}
              <Text
                onClick={() => handleSectionClick("about")}
                cursor="pointer"
                fontWeight={selectedSection === "about" ? "bold" : "normal"} // Highlight when selected
                mb={4}
              >
                About Us
              </Text>
              <Text
                onClick={() => handleSectionClick("services")}
                cursor="pointer"
                fontWeight={selectedSection === "services" ? "bold" : "normal"} // Highlight when selected
                mb={4}
              >
                Our Services
              </Text>
              <Box
                position="absolute"
                right="0px" // Positioned inside the drawer
                top="50%" // Vertically center the triangle
                transform="translateY(-50%)" // Flip the triangle
                width="0"
                height="0"
                borderTop="50px solid transparent"
                borderBottom="50px solid transparent"
                borderRight={`30px solid #0a8c90`} // Reverse the direction
                cursor="pointer"
                onClick={toggleDrawer}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* New Box that opens to the right when a section is selected */}
      {selectedSection && (
        <Box
          position="fixed"
          top="0"
          left="375px"
          height="100vh"
          width="600px"
          bg="brand.300"
          zIndex="1000"
          p={4}
          color="white"
          opacity={1}
        >
          {/* Display content based on the selected section */}
          {selectedSection === "about" && <Text>About Us Content</Text>}
          {selectedSection === "services" && <Text>Our Services Content</Text>}
        </Box>
      )}
    </>
  );
}

export default LeftDrawer;
