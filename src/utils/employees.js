import { employees } from '../datasource.json';

export const getEmployees = async () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(employees);
    }, 2000)
  );
