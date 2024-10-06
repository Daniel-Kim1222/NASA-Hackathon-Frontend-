// src/pages/MainPage.js
import React, { useState, useEffect } from "react";
import ExoplanetVisualization from "../Components/ExoplanetVisualization";
import LeftDrawer from "../Components/LeftDrawer";
import RightDrawer from "../Components/RightDrawer";
import { Box } from "@chakra-ui/react";

function MainPage() {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [exoplanetCount, setExoplanetCount] = useState(0);
  const [hostStarCount, setHostStarCount] = useState(0);

  useEffect(() => {
    // Fetch initial data (ungrouped)
    fetch("https://peaceful-atoll-81477-9628d63c0d01.herokuapp.com/api/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Store the raw data
        const groupedData = groupByHostname(data); // Group the initial data by hostname
        setFilteredData(groupedData); // Store grouped data
        updateCounts(groupedData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const groupByHostname = (data) => {
    return data.reduce((acc, exoplanet) => {
      const { hostname } = exoplanet;
      // Exclude the Sun from host stars
      if (!acc[hostname]) {
        acc[hostname] = {
          starData: exoplanet,
          exoplanets: [],
        };
      }
      acc[hostname].exoplanets.push(exoplanet);

      return acc;
    }, {});
  };

  const updateCounts = (groupedData) => {
    // Calculate the number of host stars (keys of groupedData)
    const hostStarCount = Object.keys(groupedData).length;

    // Calculate the number of exoplanets by summing the length of each exoplanet array
    const exoplanetCount = Object.values(groupedData).reduce(
      (total, star) => total + star.exoplanets.length,
      0
    );

    // Update state with the counts
    setHostStarCount(hostStarCount);
    setExoplanetCount(exoplanetCount);
  };

  // Function to apply filters (passed to RightDrawer)
  const applyFilters = (result) => {
    // Parse the filtered_data field from the result
    const parsedData = JSON.parse(result.filtered_data);

    // Extract pl_name values
    const plNames = parsedData.map((item) => item.pl_name);
    // Filter the raw data using pl_name
    const filtered = data.filter((exoplanet) =>
      plNames.includes(exoplanet.pl_name)
    );

    // Group the filtered data by hostname
    const groupedData = groupByHostname(filtered);
    console.log("here");

    // Update the filtered data
    setFilteredData(groupedData);
    updateCounts(groupedData);
  };

  // Handle the LeftDrawer state to show/hide logo
  const handleDrawerToggle = (isOpen) => {
    setIsLeftDrawerOpen(isOpen);
  };

  return (
    <div>
      {!isLeftDrawerOpen && (
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
          alt="Logo"
          style={{
            position: "absolute",
            bottom: "10px",
            left: "70px",
            width: "150px",
            height: "150px",
            zIndex: 1000,
            opacity: 0.9,
          }}
        />
      )}
      <LeftDrawer onToggle={handleDrawerToggle} />
      <ExoplanetVisualization data={filteredData} />
      <RightDrawer applyFilters={applyFilters} />
      <Box
        position="absolute"
        top="10px"
        left="50%"
        transform="translateX(-50%)"
        zIndex="1000"
        color="white"
        bg="transparent"
        p="10px"
        borderRadius="md"
        fontSize="18px"
        textAlign="center"
      >
        Host Stars: {hostStarCount} | Exoplanets: {exoplanetCount}
      </Box>
    </div>
  );
}

export default MainPage;
