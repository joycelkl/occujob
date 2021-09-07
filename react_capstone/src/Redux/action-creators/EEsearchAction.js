import axios from "axios";

export const ADD_SEARCH_SUCCESS = "ADD_SEARCH_SUCCESS";
export const ADD_SEARCH_FAIL = "ADD_SEARCH_FAIL";

export const Search = (value) => async (dispatch) => {
    try {
      console.log(value, "in redux");
      dispatch({ type: SEARCH_REQUEST });
      const { data } = await axios.post("http://localhost:8080/employee/search", value);
      // .post(`${process.env.REACT_APP_API_SERVER}/api/link/`, link)
      console.log("Gets here");
      console.log(data);
      dispatch({ type: ADD_SEARCH_SUCCESS, payload: value });
    } catch (error) {
      dispatch({ type: ADD_SEARCH_FAIL, payload: error });
    }
  };