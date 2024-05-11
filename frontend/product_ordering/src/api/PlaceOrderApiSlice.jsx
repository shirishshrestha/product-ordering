import instance from "../utils/Instance";

/**
 * Function to place an order.
 * @param {Array} selectedProducts - The array of selected products.
 * @returns {Promise} A promise that resolves with the response data upon success.
 * @throws {Error} Throws an error if the request fails.
 */
export const placeOrderReq = async (selectedProducts) => {
  try {
    const response = await instance.post("/placeOrder", { selectedProducts });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
