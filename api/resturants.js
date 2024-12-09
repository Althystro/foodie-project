import instance from ".";

const getAllResturants = async () => {
  const { data } = await instance.get("/resturant");
  return data;
};
const getAllCategories = async () => {
  const { data } = await instance.get("/category");
  return data;
};

export { getAllResturants, getAllCategories };
