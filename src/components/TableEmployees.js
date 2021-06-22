import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { formatMoney } from '../utils/money';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TableEmployees = ({ data }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align='right'>Employee Name</TableCell>
            <TableCell align='right'>Email</TableCell>
            <TableCell align='right'>Department</TableCell>
            <TableCell align='right'>Phone Numbers</TableCell>
            <TableCell align='right'>Employee Salary</TableCell>
            <TableCell align='right'>Employee Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>
              <TableCell align='right'>{row.employeeName}</TableCell>
              <TableCell align='right'>{row.email}</TableCell>
              <TableCell align='right'>{row.department}</TableCell>
              <TableCell align='right'>{row.phoneNumbers}</TableCell>
              <TableCell align='right'>{formatMoney(row.employeeSalary)}</TableCell>
              <TableCell align='right'>{row.employeeAge}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableEmployees;
