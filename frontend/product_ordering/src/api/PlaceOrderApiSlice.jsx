import instance from "../utils/Instance";

export const placeOrderReq = async (selectedProducts) => {
  try {
    const response = await instance.post("/placeOrder", { selectedProducts });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
