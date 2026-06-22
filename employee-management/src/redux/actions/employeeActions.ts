import type { Dispatch } from "redux";
import api from "../../api/axios";
import { FETCH_EMPLOYEES } from "../type";

export const fetchEmployees = () => {
  return async (dispatch: Dispatch) => {
    const response = await api.get("/users");

    dispatch({
      type: FETCH_EMPLOYEES,
      payload: response.data,
    });
  };
};

export const addEmployee = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  employee: any
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (dispatch: any) => {

    const response = await api.post(
      "/users",
      employee
    );

    dispatch({
      type: "ADD_EMPLOYEE",
      payload: response.data,
    });
  };
};