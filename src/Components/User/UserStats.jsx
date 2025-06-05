import React from 'react';
import Head from '../Helper/Head';
import { USER_GET, BALANCE_USER_GET } from '../../Api';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));

const UserStats = () => {
  const [balanceData, setBalanceData] = React.useState([]);
  const [balanceLoading, setBalanceLoading] = React.useState(false);
  const [balanceError, setBalanceError] = React.useState(null);

  React.useEffect(() => {
    async function fetchBalanceData() {
      setBalanceLoading(true);
      setBalanceError(null);
      try {
        const token = window.localStorage.getItem('token');
        if (!token) throw new Error('Usuário não autenticado');

        const { url: userUrl, options: userOptions } = USER_GET(token);
        const userResponse = await fetch(userUrl, userOptions);
        const userData = await userResponse.json();

        if (!userResponse.ok)
          throw new Error(userData.message || 'Erro ao obter usuário');

        const userId = userData.id;

        const { url: balanceUrl, options: balanceOptions } = BALANCE_USER_GET(userId);
        const balanceResponse = await fetch(balanceUrl, balanceOptions);
        const balanceData = await balanceResponse.json();

        console.log('Balance Data:', balanceData);

        if (!balanceResponse.ok)
          throw new Error(balanceData.message || 'Erro ao obter saldo');

        setBalanceData(balanceData);
      } catch (err) {
        setBalanceError(err.message);
      } finally {
        setBalanceLoading(false);
      }
    }

    fetchBalanceData();
  }, []);

  if (balanceLoading) return <Loading />;
  if (balanceError) return <Error error={balanceError} />;

  if (balanceData.length > 0)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatísticas" />
        <UserStatsGraphs balanceData={balanceData} />
      </React.Suspense>
    );
  else return <p>Nenhum dado encontrado.</p>;
};

export default UserStats;
