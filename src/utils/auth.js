import { employees } from '../datasource.json';

export const login = (email, password) => {
  const employee = employees.find(
    (employee) => employee.email === email && employee.password === password
  );
  if (employee) {
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('user', JSON.stringify(employee));
  } else throw Error('Email or password is wrong.');
};

export const isAuthenticated = () => localStorage.getItem('isAuthenticated');

export const getCurrentUser = async () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      resolve(user);
    }, 2000)
  );

export const logout = () => localStorage.clear();
