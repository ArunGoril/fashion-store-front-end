import axios from "axios";

// creating new user
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        userData
      );
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error.response.data);
    }
  });
}

// verifing login user data
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginInfo
      );
      const data = await response.data;
      resolve({data});
    } catch (error) {
      // console.log(error.response.data)
      reject(error.response.data);
    }
  });
}

// sign out user
export function signOut(userId) {
  return new Promise(async (resolve) => {
    // on server we will remove user session info
    resolve({ data: "success" });
  });
}
