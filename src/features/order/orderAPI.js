import axios from "axios";

// creating user order
export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post('http://localhost:8080/orders', order);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}