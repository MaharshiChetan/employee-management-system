import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useLoginStyles from '../hooks/LoginStyles';
import { isAuthenticated, login } from '../utils/auth';

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        CogniTensor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Login = () => {
  const history = useHistory();
  const classes = useLoginStyles();
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [form, setForm] = useState({
    email: { error: false, helperText: null, value: '' },
    password: { error: false, helperText: null, value: '' },
  });

  if (isAuthenticated() === 'true') history.push('/home');

  const validateEmail = (value) => {
    if (!value) return { error: true, helperText: 'Email is required.', value };

    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(value)) {
      return { error: true, helperText: 'Please enter valid email address.', value };
    }
    return { error: false, helperText: null, value };
  };

  const validatePassword = (value) => {
    if (!value) return { error: true, helperText: 'Password is required.', value };
    return { error: false, helperText: null, value };
  };

  const handleFormChange = (key, value) => {
    if (key === 'email') {
      const emailValidation = validateEmail(value);
      setForm((prevValue) => ({ ...prevValue, [key]: emailValidation }));
    } else if (key === 'password') {
      const passwordValidation = validatePassword(value);
      setForm((prevValue) => ({ ...prevValue, [key]: passwordValidation }));
    }
  };

  const onLogin = (email, password) => {
    try {
      login(email, password);
      setMessage('Login successfully!');
      setShowMessage(true);
      history.push('/employees');
    } catch (error) {
      setMessage(error.toString());
      setShowMessage(true);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    if (form.email.error || form.password.error || !email || !password) {
      setMessage('Please input valid fields.');
      setShowMessage(true);
    } else {
      onLogin(email, password);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={showMessage}
        autoHideDuration={2000}
        onClose={() => setShowMessage(false)}
        message={message}
      />

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            value={form.email.value}
            autoComplete='off'
            autoFocus
            onChange={(event) => handleFormChange('email', event.target.value)}
            error={form.email.error}
            fullWidth
            helperText={form.email.helperText}
            id='email'
            label='Email Address'
            margin='normal'
            name='email'
            required
            variant='outlined'
          />

          <TextField
            value={form.password.value}
            onChange={(event) => handleFormChange('password', event.target.value)}
            autoComplete='off'
            error={form.password.error}
            fullWidth
            helperText={form.password.helperText}
            id='password'
            label='Password'
            margin='normal'
            name='password'
            required
            type='password'
            variant='outlined'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>

      <Copyright />
    </Container>
  );
};

export default Login;
