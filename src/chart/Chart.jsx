import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PieRechartComponent = ({ fetchdata }) => {
  // const [chosenSegmentType, setChosenSegmentType] = useState();
  // const [chosenSegmentDescription, setChosenSegmentDescription] = useState();

  const filteredCity = fetchdata.map((item) => item.address.city);
  const norepeatCities = [...new Set(filteredCity)];
  console.log(norepeatCities);

  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
  const pieData = norepeatCities.map((city) => {
    return {
      name: city,
      value: 25,
    };
  });
  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <PieChart width={730} height={300}>
        <Pie
          data={pieData}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
        >
          {fetchdata.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
      <div>
        <div style={{ display: "flex" }}>{norepeatCities}</div>
      </div>
    </>
  );
};
export default PieRechartComponent;
