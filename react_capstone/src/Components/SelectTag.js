// import React, { useState, useEffect, Component } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { actionCreators } from '../Redux';
// import { bindActionCreators } from 'redux';
// import Select from 'react-select'
// import "@pathofdev/react-tag-input/build/index.css";

// const SelectTag= ()=>{
//     const dispatch = useDispatch();
//     const [worklocation, setWorkLocation] = useState('');
//     const locationState = useSelector((state) => {
//         console.log("location", state.location);
//         return state.location
//       });
//       const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
//       useEffect(() => {
//         loadLocationThunkAction();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//       }, [])
//       let locationTag = []
//   if (locationState.length > 0) {
//     locationState.map((loc) => (locationTag.push({ "label": loc.location, "value": loc.location })))
//   }
//   const handleLocationChange = obj => {
//     setWorkLocation(obj);
//   }
//   const LocationTag = () => (
//     <Select
//       defaultValue={worklocation}
//       value={worklocation}
//       isMulti
//       name="location"
//       options={locationTag}
//       onChange={handleLocationChange}
//       className="basic-multi-select"
//       classNamePrefix="select"
//     />
//   )
//     return(
//     <LocationTag/>
//     )
//     }
//     export default SelectTag;