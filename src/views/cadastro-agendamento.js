import React, { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';

import axios from 'axios';
import { BASE_URL3 } from '../config/axios';

function CadastroAgendamento() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL3 = `${BASE_URL3}/Agendamentos`;

  const [id, setId] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [servico, setServico] = useState('');
  const [pet, setPet] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setData('');
      setHorario('');
      setHoraEntrada('');
      setHoraSaida('');
      setServico('');
      setPet('');
    } else {
      setId(dados.id);
      setData(dados.data);
      setHorario(dados.horario);
      setHoraEntrada(dados.horaEntrada);
      setHoraSaida(dados.horaSaida);
      setServico(dados.servico);
      setPet(dados.pet);
    }
  }

  async function salvar() {
    let dadosAgendamento = {
      id,
      data,
      horario,
      horaEntrada,
      horaSaida,
      servico,
      pet,
    };
    dadosAgendamento = JSON.stringify(dadosAgendamento);
    if (idParam == null) {
      await axios
        .post(baseURL3, dadosAgendamento, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Agendamento ${servico} cadastrada com sucesso!`);
          navigate(`/listagem-agendamentos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.dadosAgendamento);
        });
    } else {
      await axios
        .put(`${baseURL3}/${idParam}`, dadosAgendamento, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Agendamento ${servico} alterada com sucesso!`);
          navigate(`/listagem-agendamentos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.dadosAgendamento);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL3}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setData(dados.data);
      setHorario(dados.horario);
      setHoraEntrada(dados.horaEntrada);
      setHoraSaida(dados.horaSaida);
      setServico(dados.servico);
      setPet(dados.pet);
    }
  }
  const [dadosPets, setDadosPets] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL3}/pets`).then((response) => {
      setDadosPets(response.data);
    });
  }, []);
  const [dadosServicos, setDadosServicos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL3}/servicos`).then((response) => {
      setDadosServicos(response.data);
    });
  }, []);

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Agendamento'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Serviço: *' htmlFor='selectServico'>
                <select
                  className='form-select'
                  id='selectServico'
                  name='servico'
                  value={servico}
                  onChange={(e) => setServico(e.target.value)} 
                >
                  <option key='0' value='0'>
                    Selecione um serviço
                  </option>
                  {dadosServicos && dadosServicos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Data: *' htmlFor='inputData'>
                <input
                  type='date'
                  id='inputData'
                  value={data}
                  className='form-control'
                  name='data'
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label='Horário: *'
                htmlFor='inputHorario'
              >
                <input
                  type='text'
                  id='inputHorario'
                  value={horario}
                  className='form-control'
                  name='horario'
                  onChange={(e) => setHorario(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Pet: *' htmlFor='selectPet'>
                <select
                  className='form-select'
                  id='selectPet'
                  name='pet'
                  value={pet}
                  onChange={(e) => setPet(e.target.value)} 
                >
                  <option key='0' value='0'>
                    Selecione um pet
                  </option>
                  {dadosPets && dadosPets.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Hora de entrada: *' htmlFor='inputHoraEntrada'>
                <input
                  type='text'
                  id='inputHoraEntrada'
                  value={horaEntrada}
                  className='form-control'
                  name='horaEntrada'
                  onChange={(e) => setHoraEntrada(e.target.value)}  
                />
              </FormGroup>

              <FormGroup label='Hora de saída: *' htmlFor='inputHoraSaida'>
                <input
                  type='text'
                  id='inputHoraSaida'
                  value={horaSaida}
                  className='form-control'
                  name='horaSaida'
                  onChange={(e) => setHoraSaida(e.target.value)}  
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
                  onClick={() => navigate('/listagem-agendamentos')}
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

export default CadastroAgendamento;