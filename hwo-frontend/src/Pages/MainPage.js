// src/pages/MainPage.js
import React, { useState, useEffect } from "react";
import ExoplanetVisualization from "../Components/ExoplanetVisualization";
import LeftDrawer from "../Components/LeftDrawer";
import RightDrawer from "../Components/RightDrawer";

function MainPage() {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);

  useEffect(() => {
    // Fetch initial data (ungrouped)
    fetch("https://peaceful-atoll-81477-9628d63c0d01.herokuapp.com/api/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Store the raw data
        const groupedData = groupByHostname(data); // Group the initial data by hostname
        setFilteredData(groupedData); // Store grouped data
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

    // Update the filtered data
    setFilteredData(groupedData);
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
    </div>
  );
}

export default MainPage;
