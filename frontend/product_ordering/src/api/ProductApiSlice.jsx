import instance from "../utils/Instance";

/**
 * Function to fetch products from the server.
 * @returns {Promise} A promise that resolves with the products data upon success.
 * @throws {Error} Throws an error if the request fails.
 */
export const getProducts = async () => {
  try {
    const response = await instance.get("/products");
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
