const generateRandomData = () => {
  const items = ["Quantity"];
  const categories = ["T-Shirt", "Blazer", "Jacket", "Shirt", "Pants", "Polo"];

  return categories.map((category) => {
    const monthData = { category };
    items.forEach((item) => {
      monthData[item] = Math.floor(Math.random() * 99) + 1; // Random sales from 1 to 20
    });
    return monthData;
  });
};

const chartData = generateRandomData();

export { chartData };
