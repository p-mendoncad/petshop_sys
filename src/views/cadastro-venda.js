import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroVenda() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/vendas`;
  const baseURLItemVenda = `${BASE_URL}/itemVendas`;

  const [id, setId] = useState('');
  const [idProduto, setIdProduto] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [precoVenda, setPrecoVenda] = useState(0);
  const [idCliente, setIdCliente] = useState('');
  const [dados, setDados] = useState([]);

  const valorTotal = quantidade * precoVenda;

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdProduto('');
      setQuantidade(0);
      setPrecoVenda(0);
      setIdCliente('');
    } else {
      setId(dados.id);
      setIdProduto(dados.idProduto);
      setQuantidade(dados.quantidade);
      setPrecoVenda(dados.precoVenda);
      setIdCliente(dados.idCliente);
    }
  }

  async function salvar() {
    const itemVenda = {
      idProduto: parseInt(idProduto),
      quantidade: parseInt(quantidade),
      subtotal: valorTotal,
    };

    try {
      const responseItem = await axios.post(baseURLItemVenda, JSON.stringify(itemVenda), {
        headers: { 'Content-Type': 'application/json' },
      });

      const itemVendaId = responseItem.data.id;

      const dadosVenda = {
        id: parseInt(id),
        idCliente: parseInt(idCliente),
        idItemVenda: parseInt(itemVendaId),
      };

      const payload = JSON.stringify(dadosVenda);

      if (idParam == null) {
        await axios
          .post(baseURL, payload, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(() => {
            mensagemSucesso('Venda cadastrada com sucesso!');
            navigate('/listagem-vendas');
          })
          .catch((error) => {
            mensagemErro(error.response.data);
          });
      } else {
        await axios
          .put(`${baseURL}/${idParam}`, payload, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(() => {
            mensagemSucesso('Venda atualizada com sucesso!');
            navigate('/listagem-vendas');
          })
          .catch((error) => {
            mensagemErro(error.response.data);
          });
      }
    } catch (error) {
      mensagemErro('Erro ao salvar a venda');
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setIdProduto(dados.idProduto);
      setQuantidade(dados.quantidadeProduto);
      setPrecoVenda(dados.precoProduto);
      setIdCliente(dados.idCliente);
    }
  }

  const [dadosProdutos, setDadosProdutos] = React.useState(null);
  const [dadosClientes, setDadosClientes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/produtos`).then((response) => {
      setDadosProdutos(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Vendas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Produto: *' htmlFor='selectProduto'>
                <select
                  className='form-select'
                  id='selectProduto'
                  name='idProduto'
                  value={idProduto}
                  onChange={(e) => {
                    const idSelecionado = e.target.value;
                    setIdProduto(idSelecionado);

                    const produtoSelecionado = dadosProdutos.find(p => String(p.id) === idSelecionado);
                    if (produtoSelecionado) {
                      setPrecoVenda(produtoSelecionado.precoVenda);
                    }
                  }}
                >
                  <option key='0' value='0'>
                    Selecione um Produto
                  </option>
                  {dadosProdutos &&
                    dadosProdutos.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.nome}
                      </option>
                    ))}
                </select>
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

              <FormGroup label='Valor Unitário: *' htmlFor='inputPrecoVenda'>
                <input
                  type='number'
                  id='inputPrecoVenda'
                  value={precoVenda}
                  className='form-control'
                  name='precoVenda'
                  onChange={(e) => setPrecoVenda(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Valor Total:' htmlFor='inputValorTotal'>
                <input
                  type='number'
                  id='inputValorTotal'
                  value={valorTotal}
                  className='form-control'
                  name='valorTotal'
                  readOnly
                />
              </FormGroup>

              <FormGroup label='Cliente: *' htmlFor='selectCliente'>
                <select
                  className='form-select'
                  id='selectCliente'
                  name='idCliente'
                  value={idCliente}
                  onChange={(e) => setIdCliente(e.target.value)}
                >
                  <option key='0' value='0'>
                    Selecione um Cliente
                  </option>
                  {dadosClientes &&
                    dadosClientes.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.nome}
                      </option>
                    ))}
                </select>
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>
                  Salvar
                </button>
                <button onClick={() => navigate('/listagem-vendas')} type='button' className='btn btn-danger'>
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
