const generateRandomData = () => {
  const items = ["T-Shirt", "Blazer", "Jacket", "Shirt", "Pants", "Polo"];
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  return months.map((month) => {
    const monthData = { month };
    items.forEach((item) => {
      monthData[item] = Math.floor(Math.random() * 99) + 1; // Random sales from 1 to 20
    });
    return monthData;
  });
};

const chartData = generateRandomData();

export { chartData };
