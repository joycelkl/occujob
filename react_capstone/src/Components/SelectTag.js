import React, {useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../Redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select'
import "@pathofdev/react-tag-input/build/index.css";

const SelectTag= (props)=>{
        
    // I modified this into a component, when insert this component please use the below in the parent 
    // const [location, setLocation] = useState(null);
    // const handleLocationChange = obj => {
    //     setLocation(obj);
    // }
    //<SelectTag value={location} handleTagOnChange={handleLocationChange} />

    const {value, handleTagOnChange} = props

    const dispatch = useDispatch();

    const locationState = useSelector((state) => state.location);
    
    const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
    useEffect(() => {
    loadLocationThunkAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let locationTag = []
    if (locationState.length > 0) {
        locationState.map((loc) => (locationTag.push({ "label": loc.location, "value": loc.location })))
    }

   const LocationTag = () => (
    <Select
      defaultValue={null}
      value={value}
      isMulti
      name="location"
      options={locationTag}
      onChange={handleTagOnChange}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )
    return(
    <LocationTag/>
    )
}

export default SelectTag;