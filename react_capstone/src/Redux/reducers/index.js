import { combineReducers } from "redux";
import authReducer from './authReducer'
import publicJobReducer from './publicJobReducer'


const reducers = combineReducers({
    auth: authReducer,
    publicJob: publicJobReducer
})

export default reducers