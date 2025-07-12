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
  const baseURL = `${BASE_URL}/pets`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [peso, setPeso] = useState('');
  // const [histoVac, setHistoVac] = useState('');
  const [sexo, setSexo] = useState('');
  const [obs, setObs] = useState('');
  const [idRaca, setIdRaca] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [histServ, setHistServ] = useState('');

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setDataNasc('');
      setPeso('');
      // setHistoVac('');
      setSexo('');
      setObs('');
      setIdRaca('');
      setIdCliente('');
      setHistServ('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setDataNasc(dados.dataNasc);
      setPeso(dados.peso);
      // setHistoVac(dados.histoVac);
      setSexo(dados.sexo);
      setObs(dados.obs);
      setIdRaca(dados.idRaca);
      setIdCliente(dados.idCliente);
      setHistServ(dados.histServ);

    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      dataNasc,
      peso,
      // histoVac,
      sexo: sexo === 'M' ? true : false,
      obs,
      idRaca: Number(idRaca),
      idCliente: Number(idCliente),
      histServ,
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
          console.log('Erro completo:', error);
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
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setDataNasc(dados.dataNasc);
      setPeso(dados.peso);
      // setHistoVac(dados.histoVac);
      setSexo(dados.sexo);
      setObs(dados.obs);
      setIdRaca(dados.idRaca);
      setIdCliente(dados.idCliente);
      setHistServ(dados.histServ);
    }
  }

  const [dadosRaca, setDadosRaca] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/racas`).then((response) => {
      setDadosRaca(response.data);
    });
  }, []);

  const [dadosCliente, setDadosCliente] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/clientes`).then((response) => {
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
              <FormGroup label='Data de Nascimento: *' htmlFor='inputDataNasc'>
                <input
                  type='date'
                  id='inputDataNasc'
                  value={dataNasc}
                  className='form-control'
                  name='dataNasc'
                  onChange={(e) => setDataNasc(e.target.value)}
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
              {/* <FormGroup label='Histórico de Vacina: *' htmlFor='inputHistoVac'>
                <select
                  id='inputHistoVac'
                  value={histoVac}
                  className='form-control'
                  name='histoVac'
                  onChange={(e) => setHistoVac(e.target.value)}
                >
                  <option value=''>Selecione</option>
                  <option value='sim'>Sim</option>
                  <option value='nao'>Não</option>
                </select>
              </FormGroup> */}
              <FormGroup label='Sexo: *' htmlFor='inputSexo'>
                <select
                  id='inputSexo'
                  value={sexo}
                  className='form-control'
                  name='sexo'
                  onChange={(e) => setSexo(e.target.value)}
                >
                  <option value=''>Selecione</option>
                  <option value="true">Macho</option>
                  <option value="false">Fêmea</option>
                </select>
              </FormGroup>
              <FormGroup label='Observações:' htmlFor='inputObs'>
                <textarea
                  id='inputObs'
                  value={obs}
                  className='form-control'
                  name='obs'
                  onChange={(e) => setObs(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Raça: *' htmlFor='selectRaca'>
                <select
                  className='form-select'
                  id='selectRaca'
                  name='raca'
                  value={idRaca}
                  onChange={(e) => setIdRaca(e.target.value)}
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
                  name='cliente'
                  value={idCliente}
                  onChange={(e) => setIdCliente(e.target.value)}
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
              <FormGroup label='Historico de Serviços:' htmlFor='inputHistServ'>
                <input
                  type='text'
                  id='inputHistServ'
                  value={histServ}
                  className='form-control'
                  name='histServ'
                  onChange={(e) => setHistServ(e.target.value)}
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
                  onClick={() => navigate('/listagem-pets')}
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
