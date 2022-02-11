import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("http://localhost:3001/auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log(res.data);
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
