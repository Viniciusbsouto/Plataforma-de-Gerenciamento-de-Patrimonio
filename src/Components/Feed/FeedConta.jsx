import React, { useEffect, useState } from 'react';
import { BALANCE_USER_GET, USER_GET } from '../../Api'; // Ajuste conforme o caminho

const FeedConta = () => {
  const [total, setTotal] = useState(0);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBalance() {
      setLoading(true);
      setError(null);

      try {
        const token = window.localStorage.getItem('token');
        if (!token) throw new Error('Usuário não autenticado');

        // Busca dados do usuário
        const { url: userUrl, options: userOptions } = USER_GET(token);
        const userResponse = await fetch(userUrl, userOptions);
        const userData = await userResponse.json();

        if (!userResponse.ok)
          throw new Error(userData.message || 'Erro ao obter usuário');

        const userId = userData.id;

        // Busca lançamentos
        const { url: balanceUrl, options: balanceOptions } =
          BALANCE_USER_GET(userId);
        const balanceResponse = await fetch(balanceUrl, balanceOptions);
        const balanceData = await balanceResponse.json();

        if (!balanceResponse.ok)
          throw new Error(balanceData.message || 'Erro ao obter saldo');

        // Salva lista e calcula total
        setBalances(balanceData);
        const totalValue = balanceData.reduce(
          (acc, item) => acc + parseFloat(item.valor),
          0,
        );
        setTotal(totalValue);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBalance();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Saldo Total</h2>
      <p>R$ {total.toFixed(2)}</p>

      <h3>Lançamentos</h3>
      {balances.length === 0 ? (
        <p>Nenhum lançamento encontrado.</p>
      ) : (
        <ul>
          {balances.map((item) => (
            <li
              key={item.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <p>
                <strong>Descrição:</strong> {item.descricao}
              </p>
              <p>
                <strong>Valor:</strong> R$ {parseFloat(item.valor).toFixed(2)}
              </p>
              <p>
                <strong>Instituição:</strong> {item.instituicao}
              </p>
              <p>
                <strong>Tipo:</strong> {item.tipo}
              </p>
              <p>
                <strong>Data:</strong> {item.data_publicacao}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedConta;
