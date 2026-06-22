import type { Employee } from "../types/Employee";

export const FETCH_EMPLOYEES = "FETCH_EMPLOYEES";

interface FetchEmployeesAction {
  type: typeof FETCH_EMPLOYEES;
  payload: Employee[];
}

export type EmployeeActionTypes =
  | FetchEmployeesAction;