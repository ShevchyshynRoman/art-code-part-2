import React, { useEffect, useState } from 'react';
import './App.scss';
import {
  getSelectDataBrandsTerms,
  getSelectDataStyles,
  getSelectDataTerms,
} from './api/api';
import { Select } from './components/Select';

export const App: React.FC = () => {
  const { pathname } = window.location;

  const [termsSelectData, setTermsSelectData] = useState([]);
  const [brandsTermsSelectData, setBrandsTermsSelectData] = useState([]);
  const [stylesSelectData, setStylesSelectData] = useState([]);

  useEffect(() => {
    async function response() {
      try {
        const termsDataFromServer = await getSelectDataTerms();
        const brandsTermsDataFromServer = await getSelectDataBrandsTerms();
        const stylesDataFromServer = await getSelectDataStyles();

        setTermsSelectData(termsDataFromServer.data);
        setBrandsTermsSelectData(brandsTermsDataFromServer.data);
        setStylesSelectData(stylesDataFromServer.data);
      } catch {
        alert('Cant load data from server...');
      }
    }

    response();
  }, []);

  return (
    <div className="App">
      <Select pathname={pathname} name="s" selectList={termsSelectData} />
      <Select pathname={pathname} name="b" selectList={brandsTermsSelectData} />
      <Select pathname={pathname} name="st" selectList={stylesSelectData} />
    </div>
  );
};
