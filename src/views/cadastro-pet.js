import React, { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';
import { BASE_URL3 } from '../config/axios';

function CadastroPet() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL3 = `${BASE_URL3}/pets`;

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
  const [nomeCliente, setNomeCliente] = useState('');
  const [clienteId, setClienteId] = useState('');

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
      setNomeCliente('');
      setClienteId('');
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
      setNomeCliente(dados.nomeCliente);
      setClienteId(dados.clienteId);

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
      nomeCliente,
      clienteId,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL3, data, {
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
        .put(`${baseURL3}/${idParam}`, data, {
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
    if (idParam != null) {
      await axios.get(`${baseURL3}/${idParam}`).then((response) => {
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
      setNomeCliente(dados.nomeCliente);
      setClienteId(dados.clienteId);
      console.log(dados.nome);
      // console.log(dados.racaId); 
      console.log(dados.nomeCliente);
    }
  }

  const [dadosRaca, setDadosRaca] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL3}/racas`).then((response) => {
      setDadosRaca(response.data);
    });
  }, []);

  const [dadosCliente, setDadosCliente] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL2}/clientes`).then((response) => {
      setDadosCliente(response.data);
    });
  }, []);

  useEffect(() => {
    buscar();
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
              <FormGroup label='Raça: *' htmlFor='selectRaca'>
                <select
                  className='form-select'
                  id='selectRaca'
                  name='raca'
                  value={racaId}
                  onChange={(e) => setNomeRaca(e.target.value)}
                >
                  <option key='0' value='0'>
                    Selecione uma raça
                  </option>
                  {dadosRaca && dadosRaca.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Cliente: *' htmlFor='selectCliente'>
                <select
                  className='form-select'
                  id='selectCliente'
                  name='nomeCliente'
                  value={clienteId}
                  onChange={(e) => setNomeCliente(e.target.value)}
                >
                  <option key='0' value='0'>
                    Selecione um cliente
                  </option>
                  {dadosCliente && dadosCliente.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
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
