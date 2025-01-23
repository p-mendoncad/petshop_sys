import React, { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroAgendamento() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/Agendamentos`;

  const [id, setId] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [servico, setServico] = useState('');
  const [pet, setPet] = useState(0);

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setData('');
      setHorario('');
      setHoraEntrada('');
      setHoraSaida('');
      setServico('');
      setPet(0);
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
    let data = {
      id,
      data,
      horario,
      horaEntrada,
      horaSaida,
      servico,
      pet
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Agendamento ${servico} cadastrada com sucesso!`);
          navigate(`/listagem-agendamentos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Agendamento ${servico} alterada com sucesso!`);
          navigate(`/listagem-agendamentos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if(idParam){
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
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

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Agendamento'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Serviço: *' htmlFor='inputServico'>
                <input
                  type='text'
                  id='inputServico'
                  value={servico}
                  className='form-control'
                  name='servico'
                  onChange={(e) => setServico(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label='Data: *'
                htmlFor='inputData'
              >
                <input
                  type='text'
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
              <FormGroup
                label='Pet: *'
                htmlFor='inputPet'
              >
                <input
                  type='text'
                  id='inputPet'
                  value={pet}
                  className='form-control'
                  name='pet'
                  onChange={(e) => setPet(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label='Hora de entrada: *'
                htmlFor='inputHoraEntrada'
              >
                <input
                  type='text'
                  id='inputHoraEntrada'
                  value={horaEntrada}
                  className='form-control'
                  name='horaEntrada'
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label='Hora de saída: *'
                htmlFor='inputHoraSaida'
              >
                <input
                  type='text'
                  id='inputHoraSaida'
                  value={horaSaida}
                  className='form-control'
                  name='horaSaida'
                  onChange={(e) => setData(e.target.value)}
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

export default CadastroAgendamento;