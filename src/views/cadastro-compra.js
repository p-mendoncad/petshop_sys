import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroProduto() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/Produtos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [lote, setLote] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [perecibilidade, setPerecibilidade] = useState(false);
  const [dataEntrada, setDataEntrada] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [idFornecedor, setIdFornecedor] = useState('');
  const [idSetor, setIdSetor] = useState('');

  async function salvar() {
    const data = {
      id,
      nome,
      quantidade,
      lote,
      vencimento,
      perecibilidade,
      dataEntrada,
      precoCompra,
      idFornecedor,
      idSetor,
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data);
        mensagemSucesso(`Produto "${nome}" cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data);
        mensagemSucesso(`Produto "${nome}" atualizado com sucesso!`);
      }
      navigate('/listagem-produtos');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar o produto.');
    }
  }

  async function buscarProduto() {
    if (idParam != null) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const produto = response.data;
        setId(produto.id);
        setNome(produto.nome);
        setQuantidade(produto.quantidade);
        setLote(produto.lote);
        setVencimento(produto.vencimento);
        setPerecibilidade(produto.perecibilidade);
        setDataEntrada(produto.dataEntrada);
        setPrecoCompra(produto.precoCompra);
        setIdFornecedor(produto.idFornecedor);
        setIdSetor(produto.idSetor);
      } catch (error) {
        mensagemErro('Erro ao buscar o produto.');
      }
    }
  }

  const [dadosFornecedores, setDadosFornecedores] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/fornecedores`).then((response) => {
      setDadosFornecedores(response.data);
    });
  }, []);
  const [dadosEstoques, setDadosEstoques] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/estoques`).then((response) => {
      setDadosEstoques(response.data);
    });
  }, []);

  const [dadosProdutos, setDadosProdutos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/produtos`).then((response) => {
      setDadosProdutos(response.data);
    });
  }, []);
  


  useEffect(() => {
    buscarProduto();
  }, [idParam]);

  return (
    <div className='container'>
      <Card title='Cadastro de Produto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
            <FormGroup label='Produto: *' htmlFor='selectProduto'>
                <select
                  className='form-select'
                  id='selectProduto'
                  name='produto'
                  value={id}
                  onChange={(e) => setDadosProdutos(e.target.value)}  // Use 'setServico' aqui
                >
                  <option key='0' value='0'>
                    Selecione um produto
                  </option>
                  {dadosProdutos && dadosProdutos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Quantidade:' htmlFor='inputQuantidade'>
                <input
                  type='number'
                  id='inputQuantidade'
                  value={quantidade}
                  className='form-control'
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Lote:' htmlFor='inputLote'>
                <input
                  type='text'
                  id='inputLote'
                  value={lote}
                  className='form-control'
                  onChange={(e) => setLote(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Perecibilidade:' htmlFor='inputPerecibilidade'>
                <input
                  type='checkbox'
                  id='inputPerecibilidade'
                  checked={perecibilidade}
                  onChange={(e) => setPerecibilidade(e.target.checked)}
                />
              </FormGroup>

              <FormGroup label='Data de Vencimento:' htmlFor='inputVencimento'>
                <input
                  type='date'
                  id='inputVencimento'
                  value={vencimento}
                  className='form-control'
                  onChange={(e) => setVencimento(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Data de Entrada:' htmlFor='inputDataEntrada'>
                <input
                  type='date'
                  id='inputDataEntrada'
                  value={dataEntrada}
                  className='form-control'
                  onChange={(e) => setDataEntrada(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Preço de Compra:' htmlFor='inputPrecoCompra'>
                <input
                  type='number'
                  id='inputPrecoCompra'
                  value={precoCompra}
                  className='form-control'
                  onChange={(e) => setPrecoCompra(e.target.value)}
                />
              </FormGroup>
              
              <FormGroup label='Fornecedor: *' htmlFor='selectFornecedor'>
                <select
                  className='form-select'
                  id='selectFornecedor'
                  name='fornecedor'
                  value={idFornecedor}
                  onChange={(e) => setDadosFornecedores(e.target.value)}  // Use 'setServico' aqui
                >
                  <option key='0' value='0'>
                    Selecione um fornecedor
                  </option>
                  {dadosFornecedores && dadosFornecedores.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
        

              <Stack spacing={2} direction='row'>
                <button onClick={salvar} className='btn btn-success'>
                  Salvar
                </button>
                <button
                  onClick={() => navigate('/listagem-produtos')}
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

export default CadastroProduto;
