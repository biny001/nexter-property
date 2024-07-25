export const getAddress = async (address) => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=8fb50b248f7240c292ef45f5a935b8d2`
  );
  const data = await response.json();
  console.log(data);

  return data;
};
