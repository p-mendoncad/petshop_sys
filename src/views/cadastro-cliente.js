import React, { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';
import axios from 'axios';
//import { BASE_URL } from '../config/axios';
import { BASE_URL2 } from '../config/axios';

function CadastroCliente() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  //const baseURL = `${BASE_URL}/Cliente`;
  const baseURL2 = `${BASE_URL2}/clientes`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [fidelidade, setFidelidade] = useState(0);

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setDataNascimento('');
      setCpf('');
      setEmail('');
      setCelular('');
      setLogradouro('');
      setNumero('');
      setComplemento('');
      setBairro('');
      setCidade('');
      setEstado('');
      setCep('');
      setFidelidade(0);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setDataNascimento(dados.dataNascimento);
      setCpf(dados.cpf);
      setEmail(dados.email);
      setCelular(dados.celular);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setCep(dados.cep);
      setFidelidade(dados.fidelidade);
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      dataNascimento,
      cpf,
      email,
      celular,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
      fidelidade,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
      .post(baseURL2, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          mensagemSucesso(`Cliente ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-clientes`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL2}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          mensagemSucesso(`Cliente ${nome} alterado com sucesso!`);
          navigate(`/listagem-clientes`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL2}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setDataNascimento(dados.dataNascimento);
      setCpf(dados.cpf);
      setEmail(dados.email);
      setCelular(dados.celular);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setCep(dados.cep);
      setFidelidade(dados.fidelidade);
    }
  }

  useEffect(() => {
    buscar(); 
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Clientes'>
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
              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='text'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  name='cpf'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='email'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Celular: *' htmlFor='inputCelular'>
                <input
                  type='text'
                  id='inputCelular'
                  value={celular}
                  className='form-control'
                  name='celular'
                  onChange={(e) => setCelular(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                <input
                  type='text'
                  id='inputLogradouro'
                  value={logradouro}
                  className='form-control'
                  name='logradouro'
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Número: *' htmlFor='inputNumero'>
                <input
                  type='text'
                  id='inputNumero'
                  value={numero}
                  className='form-control'
                  name='numero'
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Complemento:' htmlFor='inputComplemento'>
                <input
                  type='text'
                  id='inputComplemento'
                  value={complemento}
                  className='form-control'
                  name='complemento'
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Bairro: *' htmlFor='inputBairro'>
                <input
                  type='text'
                  id='inputBairro'
                  value={bairro}
                  className='form-control'
                  name='bairro'
                  onChange={(e) => setBairro(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                <input
                  type='text'
                  id='inputCidade'
                  value={cidade}
                  className='form-control'
                  name='cidade'
                  onChange={(e) => setCidade(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Estado: *' htmlFor='inputEstado'>
                <input
                  type='text'
                  id='inputEstado'
                  value={estado}
                  className='form-control'
                  name='estado'
                  onChange={(e) => setEstado(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CEP: *' htmlFor='inputCep'>
                <input
                  type='text'
                  id='inputCep'
                  value={cep}
                  className='form-control'
                  name='cep'
                  onChange={(e) => setCep(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Pontos de Fidelidade:' htmlFor='inputFidelidade'>
                <input
                  type='number'
                  id='inputFidelidade'
                  value={fidelidade}
                  className='form-control'
                  name='fidelidade'
                  onChange={(e) => setFidelidade(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} className='btn btn-success'>
                  Salvar
                </button>
                <button
                  onClick={() => navigate('/listagem-clientes')}
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

export default CadastroCliente;
