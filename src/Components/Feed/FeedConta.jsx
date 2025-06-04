import React, { useEffect, useState } from 'react';
import { BALANCE_USER_GET, USER_GET } from '../../Api'; // Ajuste o caminho conforme onde salvou suas funções

const FeedConta = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBalance() {
      setLoading(true);
      setError(null);

      try {
        const token = window.localStorage.getItem('token');
        if (!token) throw new Error('Usuário não autenticado');

        // Primeiro, pega os dados do usuário autenticado
        const { url: userUrl, options: userOptions } = USER_GET(token);
        const userResponse = await fetch(userUrl, userOptions);
        const userData = await userResponse.json();

        if (!userResponse.ok)
          throw new Error(userData.message || 'Erro ao obter usuário');

        const userId = userData.id;

        // Agora, pega o saldo do usuário
        const { url: balanceUrl, options: balanceOptions } =
          BALANCE_USER_GET(userId);
        const balanceResponse = await fetch(balanceUrl, balanceOptions);
        const balanceData = await balanceResponse.json();

        if (!balanceResponse.ok)
          throw new Error(balanceData.message || 'Erro ao obter saldo');

        // Soma os valores (campo correto: "valor")
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
    </div>
  );
};

export default FeedConta;
