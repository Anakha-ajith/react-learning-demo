import { FETCH_EMPLOYEES } from "../type";

const initialState = {
  employees: [],
};

const employeeReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any
) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
case "ADD_EMPLOYEE":
  return {
    ...state,
    employees: [
      ...state.employees,
      action.payload,
    ],
  };
    default:
      return state;
  }
};

export default employeeReducer;