import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";

const rootReducer = combineReducers({
  employeeState: employeeReducer,
});

export default rootReducer;