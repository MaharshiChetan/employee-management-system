import React from 'react';
import { useHistory } from 'react-router-dom';

import { isAuthenticated } from '../utils/auth';

const Home = () => {
  const history = useHistory();
  if (isAuthenticated() !== 'true') history.push('/login');
  else history.push('/employees');

  return <div></div>;
};

export default Home;
