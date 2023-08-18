import {
  FIELD_CHANGED,
  NEWSLETTER,
  CONTACT_US,
  HOMESCREEN_PROMPT,
  TOGGLE_NOTIFICATION,
  USER_DETAILS,
  LOGOUT,
} from "../actions/types";

const INITIAL_STATE = {
  subscriberemail: "",
  contactname: "",
  contactnumber: "",
  contactemail: "",
  contactmessage: "",
  people: "1",
  date: "",
  deferredPrompt: "",
};

export default (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case FIELD_CHANGED:
      return {
        ...state,
        [actions.payload.prop]: actions.payload.value,
      };
    case NEWSLETTER:
      return {
        ...state,
        subscriberemail: "",
      };
    case HOMESCREEN_PROMPT:
      return {
        ...state,
        deferredPrompt: actions.payload,
      };
    case TOGGLE_NOTIFICATION:
      return {
        ...state,
        contactname: "",
        contactemail: "",
        contactnumber: "",
        contactmessage: "",
        people: 1,
      };
    case CONTACT_US:
      return {
        ...state,
        contactname: "",
        contactnumber: "",
        contactemail: "",
        contactmessage: "",
      };
    case USER_DETAILS:
      console.log("Reached here");
      return {
        ...state,
        contactemail: actions.payload.email,
        contactname: actions.payload.name,
        contactnumber: actions.payload.mobileNumber,
      };
    case LOGOUT:
      return {
        ...state,
        contactemail: "",
        contactname: "",
        contactnumber: "",
      };

    default:
      return state;
  }
};
