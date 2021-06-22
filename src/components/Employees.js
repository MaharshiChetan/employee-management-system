import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TableEmployees from './TableEmployees';
import DialogConfirmLogout from './DialogConfirmLogout';
import { getCurrentUser, logout } from '../utils/auth';
import { getEmployees } from '../utils/employees';
import MyProfile from './MyProfile';
import { Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Employees = () => {
  const classes = useStyles();
  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const [employees, setEmployees] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const fetchCurrentUser = async () => {
    const currentUser = await getCurrentUser();
    if (currentUser.authorized) setIsAuthorized(true);
  };

  const fetchEmployees = async () => {
    const employeesList = await getEmployees();
    setEmployees(employeesList);
  };

  const handleChange = (event, newValue) => setTabValue(newValue);

  const onLogout = () => setShowConfirmLogout(true);

  const onClose = () => setShowConfirmLogout(false);

  const onConfirmLogout = () => {
    logout();
    history.replace('/login');
  };

  useEffect(() => {
    fetchEmployees();
    fetchCurrentUser();
  }, []);

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Employees
          </Typography>
          <Button color='inherit' onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <DialogConfirmLogout open={showConfirmLogout} onClose={onClose} onLogout={onConfirmLogout} />

      <Container style={{ paddingTop: '20px' }}>
        <Paper className={classes.root}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab label='Employees' />
            <Tab label='My Profile' />
          </Tabs>
        </Paper>

        <br />

        {tabValue === 0 ? (
          <>
            {!employees ? (
              <Card style={{ padding: '40px', minHeight: '200px' }}>
                <Grid container direction='row' justify='center' alignItems='center'>
                  <CircularProgress />
                </Grid>
              </Card>
            ) : isAuthorized ? (
              <TableEmployees data={employees} />
            ) : (
              <Card style={{ padding: '40px', minHeight: '200px' }}>
                <Grid container direction='row' justify='center' alignItems='center'>
                  You are not authorized to access the list of other employees.
                </Grid>
              </Card>
            )}
          </>
        ) : (
          <MyProfile />
        )}
      </Container>
    </>
  );
};

export default Employees;
