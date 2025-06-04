import React from 'react';
import UserHeader from './UserHeader';
import { Routes, Route } from 'react-router-dom';
import UserBalancePost from './UserBalancePost';
import UserStats from './UserStats';
import { UserContext } from '../../UserContext';
import NotFound from '../NotFound';
import Head from '../Helper/Head';
import FeedConta from '../Feed/FeedConta';

const User = () => {
  const { data } = React.useContext(UserContext);
  return (
    <section className="container">
      <Head title="Minha Conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<FeedConta />} />
        <Route path="postar" element={<UserBalancePost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
