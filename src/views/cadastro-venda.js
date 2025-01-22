import React, { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroVenda() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/Venda`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [valorUnitario, setValorUnitario] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [cpfCliente, setCpfCliente] = useState('');

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setQuantidade(0);
      setValorUnitario(0);
      setValorTotal(0);
      setFormaPagamento('');
      setCpfCliente('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setQuantidade(dados.quantidade);
      setValorUnitario(dados.valorUnitario);
      setValorTotal(dados.valorTotal);
      setFormaPagamento(dados.formaPagamento);
      setCpfCliente(dados.cpfCliente);
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      quantidade,
      valorUnitario,
      valorTotal: valorUnitario * quantidade,
      formaPagamento,
      cpfCliente,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          mensagemSucesso(`Venda do produto ${nome} cadastrada com sucesso!`);
          navigate(`/listagem-vendas`);
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
          mensagemSucesso(`Venda do produto ${nome} alterada com sucesso!`);
          navigate(`/listagem-vendas`);
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
      setQuantidade(dados.quantidade);
      setValorUnitario(dados.valorUnitario);
      setValorTotal(dados.valorTotal);
      setFormaPagamento(dados.formaPagamento);
      setCpfCliente(dados.cpfCliente);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Vendas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome do Produto: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Quantidade: *' htmlFor='inputQuantidade'>
                <input
                  type='number'
                  id='inputQuantidade'
                  value={quantidade}
                  className='form-control'
                  name='quantidade'
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Valor Unitário: *' htmlFor='inputValorUnitario'>
                <input
                  type='number'
                  id='inputValorUnitario'
                  value={valorUnitario}
                  className='form-control'
                  name='valorUnitario'
                  onChange={(e) => setValorUnitario(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Valor Total:' htmlFor='inputValorTotal'>
                <input
                  type='number'
                  id='inputValorTotal'
                  value={quantidade * valorUnitario}
                  className='form-control'
                  name='valorTotal'
                  readOnly
                />
              </FormGroup>
              <FormGroup label='Forma de Pagamento: *' htmlFor='inputFormaPagamento'>
                <select
                  id='inputFormaPagamento'
                  value={formaPagamento}
                  className='form-control'
                  name='formaPagamento'
                  onChange={(e) => setFormaPagamento(e.target.value)}
                >
                  <option value=''>Selecione</option>
                  <option value='Pix'>Pix</option>
                  <option value='Cartão de Crédito'>Cartão de Crédito</option>
                  <option value='Cartão de Débito'>Cartão de Débito</option>
                  <option value='Dinheiro'>Dinheiro</option>
                </select>
              </FormGroup>
              <FormGroup label='CPF do Cliente: *' htmlFor='inputCpfCliente'>
                <input
                  type='text'
                  id='inputCpfCliente'
                  value={cpfCliente}
                  className='form-control'
                  name='cpfCliente'
                  onChange={(e) => setCpfCliente(e.target.value)}
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

export default CadastroVenda;
