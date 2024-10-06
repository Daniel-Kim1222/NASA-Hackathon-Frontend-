import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";

function LeftDrawer({ onToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null); // Track the selected section

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
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
        w="50px" // Adjusted width for the closed drawer state
        bg="brand.200"
        zIndex="1000"
        display={isOpen ? "none" : "flex"} // Hide the button when the drawer is open
        justifyContent="flex-end" // Aligns triangle to the end of the box
        alignItems="center"
        transition="width 0.3s ease" // Smooth transition between states
        opacity={0.9}
        onClick={toggleDrawer}
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
              {/* VStack to center the sections vertically */}
              <Box
                position="absolute"
                top="75px"
                left="50%"
                transform="translateX(-50%)"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                  alt="Logo"
                  style={{ width: "150px", height: "150px" }}
                />
              </Box>
              <VStack
                spacing={14}
                align="center"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              >
                {/* Intro Section */}
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color={
                    selectedSection === "intro" ? "brand.600" : "brand.400"
                  }
                  onClick={() => handleSectionClick("intro")}
                  cursor="pointer"
                >
                  INTRO
                </Text>

                {/* About Us */}
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color={
                    selectedSection === "about" ? "brand.600" : "brand.400"
                  }
                  onClick={() => handleSectionClick("about")}
                  cursor="pointer"
                >
                  ABOUT US
                </Text>

                {/* References */}
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color={
                    selectedSection === "references" ? "brand.600" : "brand.400"
                  }
                  onClick={() => handleSectionClick("references")}
                  cursor="pointer"
                >
                  REFERENCES
                </Text>
              </VStack>
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
      {selectedSection === "about" && (
        <Box
          position="absolute"
          top="0"
          left="375px"
          height="100vh"
          width="1000px"
          bg="brand.300"
          zIndex="2000"
          p={4}
          color="white"
          opacity={0.9}
        >
          {/* VStack for content */}
          {/* Close button */}
          <VStack spacing={6} align="start" mx="15px">
            <Box
              alignSelf="flex-end" // Align to the right
              cursor="pointer"
              onClick={() => setSelectedSection(null)}
            >
              <Text fontSize="4xl" fontWeight="bold" color="brand.500">
                X
              </Text>
            </Box>

            {/* Title */}
            <Text
              fontSize="3xl"
              fontWeight="bold"
              alignSelf="start"
              color="brand.500"
            >
              TEAM GRIT FORCE
            </Text>
            <Box display="flex" width="100%">
              <Box width="70%" pr={5}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/team.png`}
                  alt="Group"
                  style={{
                    filter: "grayscale(100%)",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </Box>
              <Box width="30%" pr={10} opacity={0.2}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                  alt="Logo"
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Box>
            <Text
              color="brand.400"
              fontSize="15px"
              fontFamily={"Avenir, sans-serif"}
            >
              We are Team Grit Force, a group of passionate and determined
              students ready to take on the NASA Space Apps Challenge. Our team
              consists of six members, each bringing unique skills to the
              project. <br /> <br />
              Haejun Kim (Daniel) leads the team. He manages Miro and Slack,
              sets priorities, and oversees the overall project direction. He
              also refines the main project description. <br />
              <br />
              Jeongin Koo (Jane) and Chaewon Lim (Jennie) handle the design
              work. They create the wireframes and UI using Figma. They also
              design assets, manage the project slides, and work on the 3D user
              experience.
              <br />
              <br />
              Yumi Wada and Jungah Huh (Olivia) focus on research and data. They
              collect, clean, and analyze data from NASA APIs using Python. They
              also work on building data layers for our 3D model and help
              develop the coding side of things. <br />
              <br />
              Noah Linseo Kim sets up the backend infrastructure. He integrates
              data sources, manages the GitHub repository, and ensures the
              frontend and backend work together smoothly.
            </Text>
          </VStack>
        </Box>
      )}
    </>
  );
}

export default LeftDrawer;
