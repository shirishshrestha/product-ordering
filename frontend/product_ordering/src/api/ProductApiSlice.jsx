import instance from "../utils/Instance";

export const getProducts = async () => {
  try {
    const response = await instance.get("/products");
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
