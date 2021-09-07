export const Search = (value) => async (dispatch) => {
    try {
      console.log(value, "in redux");
      dispatch({ type: LINKS_REQUEST });
      const { data } = await axios.post("http://localhost:8080/employee/search", value);
      // .post(`${process.env.REACT_APP_API_SERVER}/api/link/`, link)
      console.log("Gets here");
      console.log(data);
      dispatch({ type: ADD_LINKS_SUCCESS, payload: value });
    } catch (error) {
      dispatch({ type: ADD_LINKS_FAIL, payload: error });
    }
  };