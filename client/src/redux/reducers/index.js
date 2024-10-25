import { combineReducers } from "redux";
import uploadReducer from './upload'
import authReducer from './auth'
const rootReducer = combineReducers({
    upload: uploadReducer,
    auth: authReducer,
})
export default rootReducer;