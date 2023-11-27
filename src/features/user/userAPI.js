import axios from "axios";

// fetching logged in user orders
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get('http://localhost:8080/orders?userID=' + userId)
      const data = await response.data
      resolve({ data })
    } catch (error) {
      reject(error);
    }
  }
  );
}

// fetching logged in user data
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get('http://localhost:8080/users/' + userId)
      const data = await response.data
      resolve({ data })
    } catch (error) {
      reject(error);
    }
  }
  );
}

// updating user data
export function updateUser(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch('http://localhost:8080/users/' + update.id, update)
      const data = await response.data
      resolve({ data })
    } catch (error) {
      reject(error);
    }
  }
  );
}