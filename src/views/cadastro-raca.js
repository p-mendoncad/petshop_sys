import React, { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { BASE_URL3 } from '../config/axios';

function CadastroRaca() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/Raca`;
  const baseURL3 = `${BASE_URL3}/racas`;

  const [id, setId] = useState('');
  const [animal, setAnimal] = useState('');
  const [nome, setNome] = useState('');
  const [porte, setPorte] = useState('');

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setAnimal('');
      setNome('');
      setPorte('');
    } else {
      setId(dados.id);
      setAnimal(dados.animal);
      setNome(dados.nome);
      setPorte(dados.porte);
    }
  }

  async function salvar() {
    let data = {
      id,
      animal,
      nome,
      porte,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          mensagemSucesso(`Raça ${nome} cadastrada com sucesso!`);
          navigate(`/listagem-racas`);
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
          mensagemSucesso(`Raça ${nome} alterada com sucesso!`);
          navigate(`/listagem-racas`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL3}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setAnimal(dados.animal);
      setNome(dados.nome);
      setPorte(dados.porte);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Raças'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Animal: *' htmlFor='inputAnimal'>
                <input
                  type='text'
                  id='inputAnimal'
                  value={animal}
                  className='form-control'
                  name='animal'
                  onChange={(e) => setAnimal(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Nome da Raça: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Porte (Pequeno, Médio, Grande): *' htmlFor='inputPorte'>
                <input
                  type='text'
                  id='inputPorte'
                  value={porte}
                  className='form-control'
                  name='porte'
                  onChange={(e) => setPorte(e.target.value)}
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
                  onClick={inicializar}
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

export default CadastroRaca;
