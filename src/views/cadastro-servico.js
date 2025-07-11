import React, { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroServico() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/servicos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [duracao, setDuracao] = useState('');
  const [preco, setPreco] = useState('');

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setDuracao('');
      setPreco('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setDuracao(dados.duracao);
      setPreco(dados.preco);
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      duracao,
      preco,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          mensagemSucesso(`Serviço ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-servicos`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          mensagemSucesso(`Serviço ${nome} alterado com sucesso!`);
          navigate(`/listagem-servicos`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setDuracao(dados.duracao);
      setPreco(dados.preco);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Serviços'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome do Serviço: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Duração (em minutos): *' htmlFor='inputDuracao'>
                <input
                  type='number'
                  id='inputDuracao'
                  value={duracao}
                  className='form-control'
                  name='duracao'
                  onChange={(e) => setDuracao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Preço (R$): *' htmlFor='inputPreco'>
                <input
                  type='number'
                  id='inputPreco'
                  value={preco}
                  className='form-control'
                  name='preco'
                  onChange={(e) => setPreco(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={() => navigate('/listagem-servicos')}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroServico;
