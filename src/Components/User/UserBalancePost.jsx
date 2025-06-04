import React from 'react';
import styles from './UserBalancePost.module.css';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { BALANCE_POST } from '../../Api';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

const UserBalancePost = () => {
  const descricao = useForm();
  const valor = useForm('number');
  const instituicao = useForm();
  const tipo = useForm();
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      console.log('Resposta da API:', data);
      navigate('/conta');
    }
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('descricao', descricao.value);
    formData.append('valor', valor.value);
    formData.append('instituicao', instituicao.value);
    formData.append('tipo', tipo.value);

    const token = window.localStorage.getItem('token');
    const { url, options } = BALANCE_POST(formData, token);
    request(url, options);
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Descrição" type="text" name="descricao" {...descricao} />
        <Input label="Valor" type="number" name="valor" {...valor} />
        <Input
          label="Instituição"
          type="text"
          name="instituicao"
          {...instituicao}
        />
        <Input label="Tipo" type="text" name="tipo" {...tipo} />

        {loading ? (
          <Button disabled>Adicionando...</Button>
        ) : (
          <Button>Adicionar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default UserBalancePost;
