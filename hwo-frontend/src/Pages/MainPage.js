// src/pages/MainPage.js
import React, { useState, useEffect } from "react";
import ExoplanetVisualization from "../Components/ExoplanetVisualization";
import LeftDrawer from "../Components/LeftDrawer";
import RightDrawer from "../Components/RightDrawer";

function MainPage() {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState([]);

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

  return (
    <div>
      <LeftDrawer />
      <ExoplanetVisualization data={filteredData} />
      <RightDrawer applyFilters={applyFilters} />
    </div>
  );
}

export default MainPage;
