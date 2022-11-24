import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PieRechartComponent = ({ fetchdata }) => {
  const filteredCity = fetchdata.map((item) => item.address.city);
  const norepeatCities = [...new Set(filteredCity)];

  let data = [];

  norepeatCities.forEach((city) => {
    data.push({
      name: city,
      value: 0,
    });
  });

  fetchdata.forEach((item) => {
    data.forEach((dataItem, index) => {
      if (item.address.city === dataItem.name) {
        data.splice(index, 1, {
          name: dataItem.name,
          value: dataItem.value + 1,
        });
      }
    });
  });

  console.log(data);

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#E94649",
    "#F6B53F",
    "#6FAAB0",
    "#C4C24A",
    "#FFE35B",
    "#1E4629",
    "#FFE35B",
  ];

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
          data={data}
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
    </>
  );
};
export default PieRechartComponent;
