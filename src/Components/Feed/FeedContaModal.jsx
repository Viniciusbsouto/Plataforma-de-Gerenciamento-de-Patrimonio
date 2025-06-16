import React from 'react';
import styles from './FeedContaModal.module.css';
const FeedContaModal = ({ item }) => {
  if (!item) return null;

  return (
    <li className={styles.card}>
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
  );
};

export default FeedContaModal;
