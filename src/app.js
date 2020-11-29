import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { Layout } from 'antd';

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
  
import { FETCH_libraries_REQUEST } from './types';

import HomePage from './pages/HomePage/HomePage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import './app.css';

export default function App() {
  const dispatch = useDispatch();
  const showError = useSelector(state => state.showError);

  React.useEffect(() => {
    dispatch({ type: FETCH_libraries_REQUEST });
  }, [dispatch]);

  return (
      <Layout>
        {showError && <Alert message="Data loading error" type="error" showIcon />}
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/library/:order" component={DetailsPage} />
        </Switch>
      </Layout>
  );
}
