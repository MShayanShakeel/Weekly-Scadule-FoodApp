import axios from "axios";

export const HandleApi = async () => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/recipes?name=New%20Recipe"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
