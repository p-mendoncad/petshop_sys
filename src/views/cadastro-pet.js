import React, { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';


function CadastroPet() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/Pet`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [peso, setPeso] = useState('');
  const [vacinaRaiva, setVacinaRaiva] = useState('');
  const [sexo, setSexo] = useState('');
  const [observacao, setObservacao] = useState('');
  const [animal, setAnimal] = useState('');
  const [nomeRaca, setNomeRaca] = useState('');
  const [racaId, setRacaId] = useState('');
  const [cliente, setCliente] = useState('');

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setDataNascimento('');
      setPeso('');
      setVacinaRaiva('');
      setSexo('');
      setObservacao('');
      setAnimal('');
      setNomeRaca('');
      setRacaId('');
      setCliente('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setDataNascimento(dados.dataNascimento);
      setPeso(dados.peso);
      setVacinaRaiva(dados.vacinaRaiva);
      setSexo(dados.sexo);
      setObservacao(dados.observacao);
      setAnimal(dados.animal);
      setNomeRaca(dados.nomeRaca);
      setRacaId(dados.racaId);
      setCliente(dados.cliente);
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      dataNascimento,
      peso,
      vacinaRaiva,
      sexo,
      observacao,
      animal,
      nomeRaca,
      racaId,
      cliente,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          mensagemSucesso(`Pet ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-pets`);
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
          mensagemSucesso(`Pet ${nome} atualizado com sucesso!`);
          navigate(`/listagem-pets`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setDataNascimento(dados.dataNascimento);
      setPeso(dados.peso);
      setVacinaRaiva(dados.vacinaRaiva);
      setSexo(dados.sexo);
      setObservacao(dados.observacao);
      setAnimal(dados.animal);
      setNomeRaca(dados.nomeRaca);
      setRacaId(dados.racaId);
      setCliente(dados.cliente);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Pets'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Nascimento: *' htmlFor='inputDataNascimento'>
                <input
                  type='date'
                  id='inputDataNascimento'
                  value={dataNascimento}
                  className='form-control'
                  name='dataNascimento'
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Peso (kg): *' htmlFor='inputPeso'>
                <input
                  type='number'
                  id='inputPeso'
                  value={peso}
                  className='form-control'
                  name='peso'
                  step='0.1'
                  onChange={(e) => setPeso(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Vacina Antirrábica: *' htmlFor='inputVacinaRaiva'>
                <select
                  id='inputVacinaRaiva'
                  value={vacinaRaiva}
                  className='form-control'
                  name='vacinaRaiva'
                  onChange={(e) => setVacinaRaiva(e.target.value)}
                >
                  <option value=''>Selecione</option>
                  <option value='sim'>Sim</option>
                  <option value='nao'>Não</option>
                </select>
              </FormGroup>
              <FormGroup label='Sexo: *' htmlFor='inputSexo'>
                <select
                  id='inputSexo'
                  value={sexo}
                  className='form-control'
                  name='sexo'
                  onChange={(e) => setSexo(e.target.value)}
                >
                  <option value=''>Selecione</option>
                  <option value='M'>Macho</option>
                  <option value='F'>Fêmea</option>
                </select>
              </FormGroup>
              <FormGroup label='Observações:' htmlFor='inputObservacao'>
                <textarea
                  id='inputObservacao'
                  value={observacao}
                  className='form-control'
                  name='observacao'
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </FormGroup>
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
              <FormGroup label='Raça: *' htmlFor='inputNomeRaca'>
                <input
                  type='text'
                  id='inputNomeRaca'
                  value={nomeRaca}
                  className='form-control'
                  name='nomeRaca'
                  onChange={(e) => setNomeRaca(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='ID da Raça: *' htmlFor='inputRacaId'>
                <input
                  type='number'
                  id='inputRacaId'
                  value={racaId}
                  className='form-control'
                  name='racaId'
                  onChange={(e) => setRacaId(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Cliente: *' htmlFor='inputCliente'>
                <input
                  type='text'
                  id='inputCliente'
                  value={cliente}
                  className='form-control'
                  name='cliente'
                  onChange={(e) => setCliente(e.target.value)}
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

export default CadastroPet;
