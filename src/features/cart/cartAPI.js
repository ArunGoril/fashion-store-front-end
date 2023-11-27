import axios from "axios";

// adding product to cart
export function addToCart(item) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post('http://localhost:8080/cart', item);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  }
  );
}

// fetching items that belongs to user
export function fetchCartItemsByUserId(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get('http://localhost:8080/cart?userID=' + userId);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  }
  );
}

// updating cart
export function updateCart(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch('http://localhost:8080/cart/' + update.id, update);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  }
  );
}

// deleting item from cart
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete('http://localhost:8080/cart/' + itemId);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  }
  );
}

// reseting cart
export function resetCart(userId) {
  return new Promise(async (resolve, reject) => {
    // get all the items of user's cart - and then delete each
    try {
      const response = await fetchCartItemsByUserId(userId)
      const cartItems = response.data;
      for (let item of cartItems) {
        await deleteItemFromCart(item._id);
      }
      resolve({ status: "success" });
    } catch (error) {
      reject(error);
    }
  })
}
