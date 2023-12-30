import React, { useState, useEffect } from "react";
import "../../src/App.css";
import {  CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2"; // Import Bar from 'react-chartjs-2'
import { Chart as ChartJS } from "react-chartjs-2";
import BarChart from "./BarChart";

// Register required scales for Chart.js
ChartJS.defaults.scale = {
  ...ChartJS.defaults.scale,
  category: true,
  linear: true,
};


interface DataItem {
  id: number;
  value: number;
}

const Home: React.FC = () => {
  const [getData, setGetData] = useState<DataItem[]>([]);
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Users Gained",
        data: [] as number[],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.nilu.no/aq/utd")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: DataItem[]) => {
        setGetData(data);

        setChartData({
          labels: data.map((data) => data.id.toString()),
          datasets: [
            {
              label: "Users Gained",
              data: data.map((data) => data.value),
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });

        setLoading(false); // Set loading to false when data is fetched.
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-animation">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="heading-text">Weather forecast</h1>
      <BarChart chartData={chartData} />
    </div>
  );
};

export default Home;
