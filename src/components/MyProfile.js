import React, { useEffect, useState } from 'react';

import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import { getCurrentUser } from '../utils/auth';

const MyProfile = () => {
  const [user, setUser] = useState(null);

  const fetchCurrentUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Card style={{ padding: '40px', minHeight: '200px' }}>
      {!user ? (
        <Grid container direction='row' justify='center' alignItems='center'>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container direction='row' justify='space-between'>
          {user.photographs.map((photograph) => (
            <img
              src={photograph}
              alt='profile'
              style={{ height: '250px', width: '250px', marginRight: '10px', objectFit: 'cover' }}
            />
          ))}

          <hr />

          <div>
            <h3>ID: {user.id}</h3>
            <h3>Full Name: {user.employeeName}</h3>
            <h3>Email: {user.email}</h3>
            <h3>department: {user.department}</h3>
            <h3>Phone Numbers: {user.phoneNumbers}</h3>
            <h3>Employee Salary: {user.employeeSalary}</h3>
            <h3>Employee Age: {user.employeeAge}</h3>
          </div>
        </Grid>
      )}
    </Card>
  );
};

export default MyProfile;
