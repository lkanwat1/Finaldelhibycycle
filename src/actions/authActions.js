import {
  FIELD_CHANGED,
  NEWSLETTER,
  CONTACT_US,
  PAYMENT,
  USER_DETAILS,
  LOGOUT,
} from "./types";
import axios from "axios";

export const onAuthFieldChanged = (prop, value) => {
  return {
    type: FIELD_CHANGED,
    payload: { prop, value },
  };
};

export const subscribeUser = (email) => (dispatch) => {
  axios
    .post("https://www.delhibycycle.com/newsletter", { email })
    .then((data) => {
      dispatch({
        type: NEWSLETTER,
        payload: data.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchUserDetails = () => (dispatch) => {
  axios
    .get(`https://www.delhibycycle.com/auth/profile`, {
      headers: {
        Authorization: localStorage.getItem("token"), // Replace with your actual token
      },
    })
    .then((data) => {
      dispatch({
        type: USER_DETAILS,
        payload: data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: CONTACT_US,
      });
    });
};

export const contactus = (name, number, email, message) => (dispatch) => {
  axios
    .post("https://www.delhibycycle.com/contactus", {
      name,
      number,
      email,
      message,
    })
    .then((data) => {
      dispatch({
        type: CONTACT_US,
        payload: data.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
